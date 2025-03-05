// Dummy middleware that allows all requests
exports.protect = (req, res, next) => {
    next();
  };
  