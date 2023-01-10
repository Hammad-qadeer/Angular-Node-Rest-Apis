const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
   'testdb',
   'root',
   'root',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

// sequelize.sync().then(() => {
//   console.log('User table created successfully!');
// }).catch((error) => {
//   console.error('User to create table : ', error);
// });

// sequelize.sync({ force: false }).then(() => {
//   console.log("Drop and re-sync db.");
// });

module.exports = sequelize;