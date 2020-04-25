import {isArray} from 'util';
import connection from '../db/connection';

/**
 *Football player data structure
 */
interface TeamCheck{
    name: string;
    img: string;
}

/**
 * Response format to be send for teams
 * @param {boolean}
 * keeping status compulsary as response setting default false
*/
class TeamsResponse {
    status: boolean
    data: TeamCheck[]
    message: string

    /**
     * Keeping status mandatory
     */
    constructor(status: boolean) {
      this.status = status;
    }
}

/**
 * Team interface defines the available method for teams
 */
interface TeamActions{
    getTeams(teamName:string, cb:Function): void
    insertTeam(data: Array<TeamCheck>, cb:Function): void
}

/**
 * Team class implements the functionality of
 * fetch data from nedb
 * insert data to nedb
 * update data to nedb
 */
class Teams implements TeamActions {
    con:any;

    /**
     * intializing nedb connection to class intance
     */
    constructor() {
      this.con = connection.con;
    }

    /**
     * Fetch the team based on the team name
    */
    getTeams(teamName:string, cb:Function) {
      let query = {};
      if (teamName) {
        query = {'name': {'$regex': new RegExp(teamName, 'g')}};
      }
      this.con.find(query, {_id: 0},
          function(err:any, allFootballData:Array<TeamCheck>) {
            const teamResponse = new TeamsResponse(false);
            if (!err && allFootballData.length > 0) {
              teamResponse.status = true;
              teamResponse.data = allFootballData;
              teamResponse.message = 'Successfuly fetched data';
            } else {
              teamResponse.status = false;
              teamResponse.message = allFootballData.length == 0 ?
            'No matched team found': 'Error unable to fetch team';
            }
            return cb(teamResponse);
          });
    }

    /**
     * Insert new team to football
     * @param {Array} data
     * data of interface TeamCheck
     */
    insertTeam(data: Array<TeamCheck>, cb:Function) {
      const teamResponse = new TeamsResponse(false);
      if (data && isArray(data) && data.length > 0) {
        this.con.insert(data, function(err:any, newDocs:any) {
          if (!err) {
            teamResponse.status = true;
            teamResponse.message = 'Successfully inserted ' + data.length;
            teamResponse.message += data.length > 1 ? ' teams' : ' team';
          } else {
            teamResponse.message = 'Error unable to insert data';
          }
          return cb(teamResponse);
        });
      } else {
        teamResponse.message = 'Missing Param/Nothing to insert';
        return cb(teamResponse);
      }
    }

    /**
     * Update a single entry base on the name
     * @param {TeamCheck} data
     * Update URL based on name
     */
    updateTeam(data:TeamCheck, cb:Function) {
      const teamResponse = new TeamsResponse(false);
      if (data.name && data.img) {
        this.con.update({name: data.name}, {$set: {img: data.img}},
            function(err:any, replaced:number, upsert:any) {
              if (replaced > 0) {
                teamResponse.status = true;
                teamResponse.message = 'Updated document';
              } else {
                teamResponse.message = 'Unable to Updated document';
              }
              return cb(teamResponse);
            });
      } else {
        teamResponse.message = 'Missing parameter unable update team';
        return cb(teamResponse);
      }
    }
}

export {Teams, TeamsResponse};
