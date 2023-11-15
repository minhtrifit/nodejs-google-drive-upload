const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    const uid = uuidv4();
    cb(null, uid + ".mp3");
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
