/*
 * @Author: wangqchf 
 * @Date: 2020-08-07 15:12:49 
 * @Last Modified by:   wangqchf 
 * @Last Modified time: 2020-08-07 15:12:49 
 */
import fs from 'fs'

export function readFile(filePath) {
    let fileReadPromise = new Promise((resolve, reject) => {
        fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
            if(err) reject(err)
            resoleve(data)
        })
    })

    fileReadPromise.then((data) => {
        let allStocks = data.split('\r\n')
        allStocks.forEach(item => {
            let columns = item.split(",")
        })
    })
}