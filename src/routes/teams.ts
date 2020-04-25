import express from 'express';
import {Teams} from '../helper/teams';

const router = express.Router();

/**
 * API Endpoint get all football team data
 * @returns {json} resp
 * sends team data as response
*/
router.get('/', function(req, res) {
  const teams = new Teams();
  teams.getTeams(null, (resp:any)=>{
    res.json(resp);
  });
});

/**
 * API Endpoint to fetch team based on the team name
 * @url-param {string} teamName
 *
*/
router.get('/:teamName', function(req, res) {
  const teams = new Teams();
  teams.getTeams(req.params.teamName, (resp:any)=>{
    res.json(resp);
  });
});

/**
 * API Endpoint to create a football team
 * @param {string} name
 * @param {string} url
 * pass body as json
 */
router.post('/', function(req, res) {
  const teams = new Teams();
  teams.insertTeam(req.body, (resp:any)=>{
    res.json(resp);
  });
});


router.put('/', function(req, res) {
  const teams = new Teams();
  teams.updateTeam(req.body, (resp:any)=>{
    res.json(resp);
  });
});


export default router;
