import sharp from 'sharp';
import path from 'path';
import multer from 'multer';

// use multer for post
//const upload = multer({dest: 'uploads/'});

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // only allow images and videos
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);

  const {filename, destination} = req.file;
  const newFilename = `${filename}_thumb.png`;
  const newPath = path.join(destination, newFilename);

  await sharp(req.file.path).resize(160, 160).toFormat('png').toFile(newPath);

  next();
};

export {createThumbnail, upload};
