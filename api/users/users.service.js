const pool = require('../../config/database');

module.exports = {
  store: (data, callback) => {
    pool.query(
      `insert into users(email, password, name, gender, number)
      values(?,?,?,?,?)`,
      [
        data.email,
        data.password,
        data.name,
        data.gender,
        data.number,
      ],
      (err, results, fields) => {
        if(err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
  getUserByEmail: (email, callback) => {
    pool.query(
      `select * from users where email=?`,
      [email],
      (err, results, fields) => {
        if(err) {
          return callback(err);
        }
        return callback(null, results[0]);
      }
    )
  }

}