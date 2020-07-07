/**
 * 表格数据的reducer处理
 */
import Immutable from 'immutable'
import { ActionType } from '../../../constant'

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