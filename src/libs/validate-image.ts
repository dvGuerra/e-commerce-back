import sharp from 'sharp';

export default async function validateImage(fileBuffer: Buffer): Promise<void> {
  const image = sharp(fileBuffer);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  if ((width && width > 124) || (height && height > 124)) {
    throw new Error('Image must be 124 x 124 px');
  }
}
