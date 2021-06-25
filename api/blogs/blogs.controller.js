const { getBlogs, getBlogById, store, update, deleteBlog } = require('./blogs.service')

module.exports = {
  getBlogs: (req, res) => {
    getBlogs((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: `Database connection error => ${err.sqlMessage}`,
        });
      } else {
        return res.status(200).json(results);
      }
    })
  },
  getBlogById: (req, res) => {
    const { id } = req.params
    console.log(id);
    getBlogById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: `Database connection error => ${err.sqlMessage}`,
        });
      } else {
        return res.status(200).json(results);
      }
    })
  },
  store: (req, res) => {
    // return console.log(req.body, '==', req.file);
    const data = req.body;
    data.image_path = req.file.filename;
    store(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: `Database connection error => ${err.sqlMessage}`,
        });
      } else {
        data.id = results.insertId;
        return res.status(200).json(data)
      }
    });
  },
  update: (req, res) => {
    // return console.log(req.body, '==', req.file);
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    console.log(data);
    update(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: `Database connection error => ${err.sqlMessage}`,
        });
      } else if (results.affectedRows > 0) {
        data.id = results.insertId;
        return res.status(200).json(data)
      } else {
        return res.status(400).json({
          message: "Data not found!"
        });
      }
    });
  },
  deleteBlog: (req, res) => {
    const { id } = req.params
    deleteBlog(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: `Database connection error => ${err.sqlMessage}`,
        });
      } else if (results.affectedRows > 0) {
        return res.status(200).json({
          message: "Data Deleted!"
        });
      }
      else {
        return res.status(400).json({
          message: "Data not found!"
        });
      }
    })
  },
}