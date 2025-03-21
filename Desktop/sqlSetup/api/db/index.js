import pkg from 'pg';

import config from "../../config/index.js";
import Util from 'util'

const { Pool } = pkg;

const sql_pool = new Pool({
    user: config.dbUser,
    database: config.database,
    password: config.dbPassword,
    port :config.dbPort,
    max: config.max,
    idleTimeoutMillis: config.idleTimeoutMillis,
    connectionTimeoutMillis: config.connectionTimeoutMillis,
});

const pool ={
    query:(sql,args)=>{
        return Util.promisify(sql_pool.query).call(sql_pool,sql,args);
    }
}

export default pool;