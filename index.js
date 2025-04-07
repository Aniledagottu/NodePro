import dotenv from 'dotenv';
import server from './app.js';
import db from './config/dbConfig.js'

dotenv.config({path:'./config.env'});


const port = process.env.PORT || 8000;


server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});