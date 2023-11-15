const { uploadFile } = require("../models/upload.model");

class GgDriveController {
  getInitRouter = async (req, res, next) => {
    try {
      res.status(200).json({
        message: "Google drive api router",
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };

  handleUploadMedia = async (req, res, next) => {
    try {
      const fileName = req.file.filename;

      const url = await uploadFile(fileName);

      res.status(201).json({
        message: "Successfully uploaded files",
        url: url,
      });
    } catch (error) {
      res.status(404).json({
        message: "failed",
      });
      next(error);
    }
  };
}

module.exports = new GgDriveController();
