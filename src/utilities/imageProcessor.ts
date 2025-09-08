import fs from 'fs';
import sharp from 'sharp';

export async function resizeImage(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number,
): Promise<void> {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) {
    throw new Error('Invalid width or height');
  }

  if (!fs.existsSync(inputPath)) {
    throw new Error('Input file not found');
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
}
