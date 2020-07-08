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

/**
 * 查询表格数据，根据pk_tablemeta来查
 * 返回数据是两个：table_column以及对应的业务表的数据
 */
function queryTableData() {
    ipcMain.on('tableInfo', (event, args) => {
        let retPromise = queryAllGridData(args.pk_tablemeta)
        retPromise.then(resp => {
            event.reply('allTableInfo', resp)
        }, err => {
            console.log(err)
        })
    })
}

/**
 * 初始化事件监听的类
 */
export default function initEventListener() {
    queryAllTreeInfo()
    queryTableData()
}