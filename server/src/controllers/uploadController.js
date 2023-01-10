const {Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/db.config');

const readXlsxFile = require("read-excel-file/node");
const User = require("../models/user.model");

const upload = async (req, res) => {
  try {
    debugger
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let users = [];

      rows.forEach((row) => {
        let user = {
          name: row[0],
          email: row[1],
          phone: row[2],
          cnic: row[3],
          image: row[4]
        };

        users.push(user);
      });

      users.forEach(user => {
        sequelize.query(`INSERT INTO users (name, email, phone, cnic, image) VALUES ('${user.name}', '${user.email}', '${user.phone}', '${user.cnic}', '${user.image}')`)
          .then(() => {
            // res.status(200).send({
            //   message: "Uploaded the file successfully: " + req.file.originalname,
            // });
          }).catch((error)=> {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message
            })
          })
      });
      res.status(200).send({
              message: "Uploaded the file successfully: "
            });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const uploadMultipleFiles = async (req, res) => {
	const messages = [];

	for (const file of req.files) {
        try{
            let filePath = __basedir + "/resources/static/assets/uploads/" + file.filename;
            let rows = await readXlsxFile(filePath);
    
            // `rows` is an array of rows
            // each row being an array of cells.   
            console.log(rows);
    
            // Remove Header ROW
            rows.shift();
            
            const users = [];
    
            let length = rows.length;
    
            rows.forEach((row) => {
              let user = {
                name: row[0],
                email: row[1],
                phone: row[2],
                cnic: row[3],
                image: row[4]
              };
      
              users.push(user);
            });
            let uploadResult;

            for (const user of users) {
              uploadResult = await sequelize.query(
                `INSERT INTO users (name, email, phone, cnic, image) VALUES ('${user.name}', '${user.email}', '${user.phone}', '${user.cnic}', '${user.image}')`
              );
            }
    
            // It will now wait for above Promise to be fulfilled and show the proper details
            console.log(uploadResult);
    
            if (!uploadResult){
                const result = {
                    status: "fail",
                    filename: file.originalname,				
                    message: "Can NOT upload Successfully",
                }
    
                messages.push(result);
            } else {
                const result = {
                    status: "ok",
                    filename: file.originalname,
                    message: "Upload Successfully!",
                }
                messages.push(result);
            }                   
        }catch(error){
            const result = {
                status: "fail",
                filename: file.originalname,				
                message: "Error -> " + error.message
            }

            messages.push(result);
        }
	}

	return res.json(messages);
}

const getUsers = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};

module.exports = {
  upload,
  getUsers,
  uploadMultipleFiles
};