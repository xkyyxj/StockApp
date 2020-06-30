import mysql from 'mysql';

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '123',
    database        : 'stock'
})

export function queryAllTree() {
    let retPromise = new Promise((resolve, reject) => {
        pool.query('SELECT * from ana_category', function (error, results, fields) {
            console.log(error)
            if (error) reject(err);
            resolve({results, fields})
        });
    })
    return retPromise
    
}