import pool from './pool'

/**
 * 根据tableId来查询对应表格的数据
 * @param {*} tableId table_meta的pk_tablemeta字段
 * @param {*} wherePart 待查询表格的过滤条件
 */
export function queryAllGridData(tableId, wherePart) {
    let fianlResult = new Promise((resolve,reject) => {
        pool.query('SELECT table_name from table_meta where pk_tablemeta=?', [tableId], function (error, results, fields) {
            if (error) reject(err)
            resolve({results, fields})
        });
    }).then(resp => {
        console.log(resp)
        return new Promise((resolve,reject) => {
            pool.query(`SELECT * from ${resp.results[0].table_name} ${wherePart}`, [tableId], function (error, results, fields) {
                if (error) reject(err)
                resolve({results, fields})
            });
        })
    })
    return fianlResult
}