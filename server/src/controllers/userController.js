const multiparty = require('multiparty');
const User = require('../models/user.model')
const express = require("express");
const app = express();

const IMAGE_UPLOAD_DIR = "./public/images";
const IMAGE_BASE_URL = "http://localhost:4000/images/";

const getUser = async (req, res) => {
    try{
        const users = await User.findAll({});
        res.send(users);
      }catch (err){
        console.log(err);
        res.send({error: err.message})
      }
}

const createUser = async (req, res) => {
    let form = new multiparty.Form({uploadDir: IMAGE_UPLOAD_DIR});
  
    form.parse(req, async function(err, fields, files) {
      if(err) return res.send({error: err.message})
  
      console.log(`fields = ${JSON.stringify(fields, null, 2)}`)
      console.log(`files = ${JSON.stringify(files, null, 2)}`)
  
      const imagePath = files.image[0].path;
      const imageFileName = imagePath.slice(imagePath.lastIndexOf('\\') + 1)
      const imageURL = IMAGE_BASE_URL + imageFileName;
  
      console.log(imageURL)
  
      const user = new User({
        name: fields.name[0],
        email: fields.email[0],
        phone: fields.phone[0],
        cnic: fields.cnic[0],
        image: imageURL
      })
  
      try{
        const userDetail = await user.save();
        console.log(`User = ${JSON.stringify(userDetail, null, 2)}`);
        res.send(userDetail)
      }
      catch(err) {
        console.log(err);
        res.send({error: err.message})
      }
    })
}

module.exports = {
    createUser,
    getUser
}


