// src/middlewares/notFoundHandler.js

export const notFoundHandler = (req, res, next) => {
  //приховаємо попередження від невикорстованого доки що next
  // if (next === 'fake') {
  //   next(err);
  // }
  res.status(404).json({
    message: 'Route not found',
  });
};
