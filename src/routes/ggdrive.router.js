var express = require("express");
var router = express.Router();
const GgDriveController = require("../controllers/ggdrive.controller");

const { upload } = require("../middlewares/multer");

router.get("/", GgDriveController.getInitRouter);
router.post("/", upload.single("file"), GgDriveController.handleUploadMedia);

module.exports = router;
