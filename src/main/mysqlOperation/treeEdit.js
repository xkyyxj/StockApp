import pool from './pool'

export function queryAllTree() {
    let retPromise = new Promise((resolve, reject) => {
        pool.query('SELECT * from ana_category', function (error, results, fields) {
            console.log(error)
            if (error) reject(error);
            resolve({results, fields})
        });
    })
    return retPromise
    
}

export function addTreeData(data) {
    let retPromise = new Promise((resolve, reject) => {
        let sql = "insert into ana_category(pk_tablemeta, pk_parent, category_name) values(?,?,?)"
        let valus = [data.pk_tablemeta, values.pk_parent, data.category_name]
        pool.query(sql, valus, (err, results) => {
            if(err) reject(err)
            resolve(results)
        })
    })
}