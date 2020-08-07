import pool from './pool'

/**
 * 通用查询功能
 * @param {*}} sql SQL语句，参数以？拼接
 * @param {*} params 查询参数
 */
export function commonQuery(sql, params) {
    let retRst = new Promise((resolve, reject) => {
        pool.query(sql, params, function(error, results, fields) {
            if(error) reject(error)
            resolve({results, fields})
        })
    })
    return retRst
}