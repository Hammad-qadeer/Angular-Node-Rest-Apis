const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const upload = require("../middleware/upload");
const cors = require('cors');



let routes = (app) => {
  app.use(cors());
  // router.post("/upload", upload.single("file"), uploadController.upload);
  router.post("/uploads", upload.array('file', 4), uploadController.uploadMultipleFiles);
  router.get("/users", uploadController.getUsers);

  app.use("/api/excel", router);
};

module.exports = routes;