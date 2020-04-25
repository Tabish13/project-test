import datastore from 'nedb';
import footballData from '../data/football-data.json';

/**
 * Creates an in-memory data base for the football data
 * On intialize populate the data from the football json data
 */
class Connection {
    con: any;
    footballData: any;

    /**
     * Constuctor with blan nedb connection
     */
    constructor() {
      this.con = null;
    }

    /**
     * Get connection and database setup on server start
     */
    getCon() : void{
      this.con = new datastore();
      this.con.insert(footballData, function(err:any) {
        if (!err) {
          console.log('Loading football data in-memory');
        } else {
          console.log('Error unable to load football data');
        }
      });
    }
}

export default new Connection();
