const { store } = require('./blogs.service')

module.exports = {
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
}