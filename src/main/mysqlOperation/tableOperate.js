import pool from './pool'

/**
 * 根据tableId来查询对应表格的数据
 * @param {*} tableId table_meta的pk_tablemeta字段
 * @param {*} wherePart 待查询表格的过滤条件
 */
export function queryAllGridData(tableId, wherePart) {
    console.log(`pool ts is ${pool.ts}`)
    console.log(`start in ${new Date().getTime()}`)
    if(!tableId) {
        return new Promise((resolve, reject) => {
            resolve("No Data")
        })
    }
    let fianlResult = new Promise((resolve,reject) => {
        pool.query('SELECT table_name from table_meta where pk_tablemeta=?', [tableId], function (error, results, fields) {
            if (error) reject(error)
            resolve({results, fields})
        });
    }).then(resp => {
        // 查询表格的列信息，然后决定展示的列名什么的
        let tableMeta = new Promise((resolve, reject) => {
            pool.query(`SELECT * from table_column where pk_tablemeta=?`, [tableId], function (error, results, fields) {
                if (error) reject(error)
                // 添加以下表格名称字段
                results.tableName = resp.results[0].table_name
                resolve({results, fields})
            });
        })
        // 查询表格的数据，最终表格要展示的数据
        let tableInfo = new Promise((resolve,reject) => {
            pool.query(`SELECT * from ${resp.results[0].table_name} ${wherePart}`, [tableId], function (error, results, fields) {
                if (error) reject(error)
                resolve({results, fields})
            });
        })
        return Promise.all([tableMeta, tableInfo])
    })
    return fianlResult
}

/**
 * 添加新的表格内容
 * @param {*} data 
 */
export function addTableMeta(data) {
    let insertTableMeta = `insert into table_meta(table_name, is_redis) values(?,?)`
    let insertTableColumn = `insert into table_column(pk_tablemeta, display_name, columntype, column_name) values(?,?,?,?)`
}

export function insertTableInfo(tableMeta, datas) {
    let tableName = tableMeta.tableName

    let columnsStr = tableMeta.map(item => {
        return item.column_name
    }).join(",")
    let valuesItems = new Array(tableMeta.length).fill("?").join(",")
    let sql = `insert into ${tableName}(${columnsStr}) values(${valuesItems})`
    let retPromise = new Promise((resolve, reject) => {
        pool.query(sql, datas, function(error, results, fields) {
            if(error) reject(error)
            resolve(results)
        })
    })
    return retPromise
}