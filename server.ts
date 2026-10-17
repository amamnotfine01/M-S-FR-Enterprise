import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const POSTS_FILE = path.join(DATA_DIR, 'permanent-site-posts.json');
const UPLOAD_IMG_DIR = path.join(__dirname, 'public', 'images', 'fixed-site-photos');

function ensureDirectories() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOAD_IMG_DIR)) {
    fs.mkdirSync(UPLOAD_IMG_DIR, { recursive: true });
  }
}

function readSavedPosts(): any[] {
  try {
    ensureDirectories();
    if (fs.existsSync(POSTS_FILE)) {
      const raw = fs.readFileSync(POSTS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading saved posts:', err);
  }
  return [];
}

function persistImageIfBase64(imgStr: string): string {
  if (!imgStr || !imgStr.startsWith('data:image/')) {
    return imgStr;
  }
  try {
    ensureDirectories();
    const matches = imgStr.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return imgStr;
    }
    const base64Data = matches[2];
    const hash = crypto.createHash('md5').update(base64Data).digest('hex');
    const fileName = `site-photo-${hash}.jpg`;
    const filePath = path.join(UPLOAD_IMG_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    }
    return `/images/fixed-site-photos/${fileName}`;
  } catch (err) {
    console.error('Error persisting base64 image:', err);
    return imgStr;
  }
}

async function startServer() {
  ensureDirectories();
  const app = express();
  const PORT = 3000;

  // Support large batches of photos (e.g. 53+ photos at once)
  app.use(express.json({ limit: '150mb' }));
  app.use(express.urlencoded({ extended: true, limit: '150mb' }));

  // Serve permanently saved photos directly
  app.use(
    '/images/fixed-site-photos',
    express.static(UPLOAD_IMG_DIR, { maxAge: '365d' })
  );

  // GET all permanently saved site work posts
  app.get('/api/site-posts', (_req, res) => {
    const saved = readSavedPosts();
    res.json({ posts: saved });
  });

  // POST sync & lock site work posts permanently onto server disk
  app.post('/api/site-posts/sync', (req, res) => {
    try {
      const incomingPosts = Array.isArray(req.body?.posts) ? req.body.posts : [];
      const existingPosts = readSavedPosts();

      // Convert any base64 data URLs into permanent .jpg files on disk
      const normalizedIncoming = incomingPosts.map((post: any) => {
        const imgs = Array.isArray(post.images)
          ? post.images.map((img: string) => persistImageIfBase64(img))
          : [];
        return {
          ...post,
          images: imgs,
          locked: true,
        };
      });

      // Merge without ever losing existing posts or photos
      const mergedMap = new Map<string, any>();
      for (const p of existingPosts) {
        if (p && p.id) {
          mergedMap.set(p.id, p);
        }
      }
      for (const p of normalizedIncoming) {
        if (p && p.id) {
          const prev = mergedMap.get(p.id);
          if (prev) {
            // Merge unique images so no photo is ever lost
            const combinedImages = Array.from(
              new Set([...(p.images || []), ...(prev.images || [])])
            );
            mergedMap.set(p.id, {
              ...prev,
              ...p,
              images: combinedImages,
              locked: true,
            });
          } else {
            mergedMap.set(p.id, p);
          }
        }
      }

      // Preserve order: custom posts first, then initial posts
      const finalPosts = Array.from(mergedMap.values());
      fs.writeFileSync(POSTS_FILE, JSON.stringify(finalPosts, null, 2), 'utf-8');

      res.json({ ok: true, posts: finalPosts });
    } catch (err) {
      console.error('Error syncing site posts:', err);
      res.status(500).json({ ok: false, error: 'Failed to sync posts' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`M/S FR Enterprise Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
