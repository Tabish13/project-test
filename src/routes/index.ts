import express from 'express';

const router = express.Router();

/**
 * Index route to give basic info of the App
 * @param {object} req
 * request object for the endpoint
 * @param {object} res
 * response object for the end point
 * send a response to the request endpoint
*/
router.get('/', function(req, res) {
  res.send({title: 'Football Team API'});
});


export default router;
