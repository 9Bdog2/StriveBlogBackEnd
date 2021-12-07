export const badRequestHandlers = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).json(err);
  } else {
    next(err);
  }
};

export const unauthorisedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).json({
      status: 401,
      error: err.message,
    });
  } else {
    next(err);
  }
};

export const notFoundHandlers = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).json({
      status: 404,
      error: err.message,
    });
  } else {
    next(err);
  }
};

export const genericHandlers = (err, req, res, next) => {
  if (err.status === 500) {
    res.status(500).json({
      status: 500,
      error: err.message,
    });
  } else {
    next(err);
  }
};
