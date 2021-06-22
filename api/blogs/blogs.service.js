const pool = require('../../config/database');

module.exports = {
  store: (data, callback) => {
    pool.query(
      `insert into blogs(slug, title, image_path, description)
      values(?,?,?,?)`,
      [
        data.slug,
        data.title,
        data.image_path,
        data.description
      ],
      (err, results, field) => {
        if(err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
}