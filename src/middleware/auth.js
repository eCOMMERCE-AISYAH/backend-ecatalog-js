// import jwt from 'jsonwebtoken';
// import ApiErrorHandling from '../../helper/apiErrorHandling.js';
// import responseJson from '../../helper/responseJson.js';
//
// const jwtSecret = process.env.JWT_SECRET;
//
// function authentication(req, res, next) {
//   const token = req.header('Authorization');
//
//   if (!token) {
//     return responseJson.responseError(
//       res,
//       401,
//       'invalid token',
//     );
//   }
//
//   jwt.verify(token, jwtSecret, (err, user) => {
//     if (err) {
//       if (err.name === 'TokenExpiredError') {
//         return responseJson.responseError(
//           res,
//           401,
//           'token expired',
//         );
//       } if (err.name === 'JsonWebTokenError') {
//         return responseJson.responseError(
//           res,
//           401,
//           'invalid token',
//         );
//       }
//       return res.status(403).json({ message: 'Token verification failed' });
//     }
//
//     req.user = user;
//     next();
//   });
// }
//
// export default authentication;
