import mysql from 'mysql';

// 初始化数据库连接池
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '123',
    database        : 'stock'
})

// 记录下连接池的时间戳
pool.ts = new Date().getTime()

export default pool
