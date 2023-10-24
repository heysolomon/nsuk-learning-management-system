/* eslint-disable no-use-before-define */
const multer = require('multer');
const path = require('path');

// setting the storage engine
const storage = multer.diskStorage({
  // destination: './uploads/',
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// initialize the file uplaod
const upload = multer({
  storage,

  // limits file size
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed extension format
  const filetypes = /jpeg|jpg|png/;
  // Check the extension format
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  // req.flash("error", "Invalid File");
  return cb('ERROR: kindly please upload a valid filetype');
  // return res.redirect("back");
}

module.exports = upload;
