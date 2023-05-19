const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

const userController = {
  async checkUser(req, res, next) {
    try {
      const { user } = req.params;
      //sql query here
      const query = `SELECT * FROM login WHERE user_id=$1;`;
      const result = await pool.query(query, [user]);
      res.locals.rows = result.rows;
      next();
    } catch (err) {
      console.log('Error in userController.checkUser: ', err);
    }
  },
}

module.exports = userController;