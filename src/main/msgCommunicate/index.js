import { ipcMain } from 'electron'
import { queryAllTree } from '../mysqlOperation'

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

export default function initEventListener() {
    queryAllTreeInfo()
}