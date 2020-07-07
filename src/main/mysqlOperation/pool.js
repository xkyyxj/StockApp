import mysql from 'mysql';

// 初始化数据库连接池
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '123',
    database        : 'stock'
})

export default pool
