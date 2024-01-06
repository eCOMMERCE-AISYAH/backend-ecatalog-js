import multer from 'multer';

const fileStorageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    // const sanitizeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${new Date().getTime()}.${fileExtension}`);
  },
});

export default {
  fileStorageProduct,
};
