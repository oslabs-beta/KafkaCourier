const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

const userController = {
  async createUser(req, res, next) {
    try {
      // get credentials from req.body
      const { user_id, server, key, secret } = req.body;
      // sql query
      const query = `INSERT INTO login (user_id, server, key, secret)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *`;
      const result = await pool.query(query, [user_id, server, key, secret]);
      // save newly created user information in res.locals to be used in kafka middleware
      res.locals = {
        rows: result.rows,
        server,
        username: key, 
        password: secret
      };
      next();
    } catch (err) {
      console.log('Error in userController.createUser: ', err)
    }
  },

  async checkUser(req, res, next) {
    try {
      let user;
      // console.log('req.params ', req.params);
      // check user upon login
      if (req.params.user) {
        user = req.params.user;
        console.log('typeof req.params.user: ', typeof user);
      }
      // session cookie exists
      else if (req.cookies.kafka_courier_session) {
        // console.log('checkUser cookie');
        user = JSON.parse(req.cookies.kafka_courier_session).user_id;
        // console.log('typeof user cookie: ', typeof user);
      }
      // 
      else {
        return next();
      }
      // const { user } = req.params || req.cookies.kafka_courier_session;
      //sql query here
      const query = `SELECT * FROM login WHERE user_id=$1;`;
      const result = await pool.query(query, [user]);
      res.locals.rows = result.rows;
      if (result.rows.length) {
        const row = result.rows[0];
        res.locals = {
          rows: result.rows,
          server: row.server,
          username: row.key,
          password: row.secret
        };
      }
      next();
    } catch (err) {
      console.log('Error in userController.checkUser: ', err);
    }
  }
}

module.exports = userController;