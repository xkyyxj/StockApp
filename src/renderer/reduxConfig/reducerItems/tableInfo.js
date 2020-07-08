/**
 * 表格数据的reducer处理
 */
import Immutable from 'immutable'
import { ActionType } from '../../../constant'

/**
 * 表格数据的格式：
 * {
 *  currTab: 'pk_tablemeta',
 *  'pk_tablemeta1': {
 *      meta: {//数据库里面的记录}
 *      datas: []
 *  }
 * }
 */
const initState = Immutable.Map({currTab: ''})
export default function(state = initState, action) {
    let newState = state
    let data = action.payload
    if(action.type == ActionType.TableData) {
        data ? Object.keys(data).forEach(key => {
            newState = newState.set(key, data[key])
        }) : ''
    }
    return newState
}