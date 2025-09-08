import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import type { Request, Response } from 'express';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const IMAGES_FOLDER = path.join(_dirname, '../..', 'images');
const CACHE_FOLDER = path.join(_dirname, '../..', 'cache');

// Ensure folders exist
if (!fs.existsSync(IMAGES_FOLDER)) {
  fs.mkdirSync(IMAGES_FOLDER);
}
if (!fs.existsSync(CACHE_FOLDER)) {
  fs.mkdirSync(CACHE_FOLDER);
}

// In-memory set to track currently processing files (prevents double-caching the same image)
const processingFiles = new Set<string>();

// Generate the resized image path
function getCachedFilename(originalPath: string, width: number, height: number): string {
  const fileName = path.basename(originalPath);
  const ext = path.extname(originalPath);
  return path.join(CACHE_FOLDER, `${fileName}_${width}x${height}${ext}`);
}

// Validate input
export async function handleResizeRequest(
  req: Request,
  res: Response,
  filename: string | undefined,
  widthStr?: string,
  heightStr?: string,
): Promise<void> {
  try {
    // Validate file name
    if (!filename) {
      res.status(400).send('Missing filename parameter');
      return;
    }

    // Validate query parameters
    if (!widthStr || !heightStr) {
      res.status(400).send('Missing width or height parameter');
      return;
    }

    const widthNum = parseInt(widthStr as string, 10);
    const heightNum = parseInt(heightStr as string, 10);

    if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
      res.status(400).send('Width and height must be positive numbers.');
      return;
    }

    // Only allow files inside IMAGES_FOLDER "../images"
    const safePath = path.join(IMAGES_FOLDER, filename as string);

    if (!fs.existsSync(safePath)) {
      res.status(404).send('Original image not found.');
      return;
    }

    // Generate cached file name
    const cachedFile = getCachedFilename(safePath, widthNum, heightNum);

    // If cached file exists, return it
    if (fs.existsSync(cachedFile)) {
      res.sendFile(cachedFile);
      return;
    }

    // Prevent simultaneous resizing of the same image
    if (processingFiles.has(cachedFile)) {
      res.status(429).send('Image is being processed. Please try again.');
      return;
    }

    processingFiles.add(cachedFile);

    try {
      // Resize and save to cache
      await sharp(safePath).resize(widthNum, heightNum).toFile(cachedFile);

      // Return resized image
      return res.sendFile(cachedFile);
    } finally {
      // Remove from processing set
      processingFiles.delete(cachedFile);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
