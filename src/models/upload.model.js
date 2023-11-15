const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

const setFilePublic = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const getUrl = await drive.files.get({
      fileId,
      fields: "webViewLink, webContentLink",
    });

    return getUrl;
  } catch (error) {
    console.error(error);
  }
};

const uploadFile = async (fileName) => {
  try {
    const createFile = await drive.files.create({
      requestBody: {
        name: fileName.split(".")[0],
        // mimeType: "image/png/jpg/jpeg",
        mineType: "audio/mp3",
        parents: [process.env.FOLDER_ID],
      },
      media: {
        // mimeType: "image/png/jpg/jpeg",
        mineType: "audio/mp3",
        body: fs.createReadStream(
          path.join(__dirname, `../uploads/${fileName}`)
        ),
      },
    });

    const fileId = createFile.data.id;
    const getUrl = await setFilePublic(fileId);

    // console.log(createFile.data);
    // console.log(getUrl.data);
    return getUrl.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteFile = async () => {
  try {
    const deleteFile = await drive.files.delete({
      fileId: "",
    });

    console.log(deleteFile.data, deleteFile.status);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  uploadFile,
};
