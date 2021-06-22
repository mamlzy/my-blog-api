const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { store, getUserByEmail } = require('./users.service');

module.exports = {
  register: (req, res) => {
    const data = req.body;
    const salt = genSaltSync(10);
    data.password = hashSync(data.password, salt);
    store(data, (err, results) => {
      if(err) {
        console.log(err);
        return res.status(500).json({
          message: `Database connection error => ${err.sqlMessage}`,
        });
      } else {
        data.id = results.insertId;
        data.password = undefined;

        const token = sign({ result: data }, process.env.JWT_SECRET, {
          expiresIn: '1d'
        });

        return res.status(200).json({
          user: data,
          token: token,
        });
      }
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    getUserByEmail(email, (err, results) => {
      if(err) {
        console.log(err);
        return res.status(500).json({
          message: `Database connection error => ${err.sqlMessage}`
        });
      } else if(!results){ // Check Email
        return res.status(500).json({
          message: `This email is not registered!`
        });
      } else if(!password) { // Check Pass
        return res.status(500).json({
          message: `Password is required!`
        });
      } else {
        const comparePass = compareSync(password, results.password);
        if(comparePass) {
          results.password = undefined;
          const token = sign({ result: results }, process.env.JWT_SECRET, {
            expiresIn: '1d'
          });

          return res.status(200).json({
            user: results,
            token: token,
          });
        } else {
          return res.status(500).json({
            message: 'Invalid Password',
          });
        }
      }
    });
  },


}