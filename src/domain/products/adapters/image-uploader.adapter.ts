import type { Request } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error('Invalid file type. Only image file are allowed'),
      false
    );
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
  dest: '../../public/thumbnails/products',
});

export default upload;
