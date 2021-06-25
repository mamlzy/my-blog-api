const pool = require('../../config/database');

module.exports = {
  getBlogs: callback => {
    pool.query(
      `select * from blogs`,
      [],
      (err, results, field) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
  getBlogById: (id, callback) => {
    pool.query(
      `select * from blogs where id = ?`,
      [id],
      (err, results, field) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results[0]);
      }
    );
  },
  store: (data, callback) => {
    pool.query(
      `insert into blogs(user_id, slug, title, image_path, description)
      values(?,?,?,?,?)`,
      [
        data.user_id,
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
  update: (data, callback) => {
    pool.query(
      `update blogs set slug=?, title=?, description=? where id=?`,
      [
        data.slug,
        data.title,
        data.description,
        data.id,
      ],
      (err, results, field) => {
        if(err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
  deleteBlog: (id, callback) => {
    pool.query(
      `delete from blogs where id = ?`,
      [id],
      (err, results, field) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results);
      }
    );
  },
}