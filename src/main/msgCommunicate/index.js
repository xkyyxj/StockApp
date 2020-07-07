import { ipcMain } from 'electron'
import { queryAllTree, queryAllGridData } from '../mysqlOperation'

/**
 * 树结构查询事件
 */
function queryAllTreeInfo() {
    ipcMain.on('treeInfo', (event, arg) => {
        let retPromise = queryAllTree()
        retPromise.then(resp => {
            event.reply('allTreeInfo', resp)
        }, err => {
            console.log(err)
        })
    })
      
}

function queryTableData(pk_tablemeta) {
    ipcMain.on('tableInfo', (event, args) => {
        let retPromise = queryAllGridData(pk_tablemeta)
        retPromise.then(resp => {
            event.reply('allTableInfo', resp)
        }, err => {
            console.log(err)
        })
    })
}

export default function initEventListener() {
    queryAllTreeInfo()
}