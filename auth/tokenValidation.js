const { verify } = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('authorization');
    if(token) {
      token = token.slice(7); // Slice Bearer word
      verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
          res.status(400).json({
            message: 'Invalid Token',
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        message: `Access denied! unauthorized user`,
      });
    }
  }
}