import fs from 'fs';
import { resizeImage } from '../../utils/imageProcessor.js';

describe('processImage utility function', () => {
  it('should resize and save an image', async () => {
    await resizeImage('images/everest.jpeg', 'cache/everest.jpeg_300x200.jpeg', 300, 200);
    expect(fs.existsSync('cache/everest.jpeg_300x200.jpeg')).toBeTrue();
  });

  it('should return cached file if already exists', async () => {
    const firstCall = await resizeImage('images/everest.jpg', 'cache/everest.jpg', 120, 120);
    const secondCall = await resizeImage('images/everest.jpg', 'cache/everest.jpg', 120, 120);

    expect(firstCall).toEqual(secondCall);
  });

  it('should throw an error for invalid dimensions', async () => {
    try {
      await resizeImage('images/everest.jpg', 'cache/everest.jpg', 0, 0);
      fail('Expected error was not thrown');
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
