import sharp from 'sharp';
import path from 'path';

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

export {createThumbnail};
