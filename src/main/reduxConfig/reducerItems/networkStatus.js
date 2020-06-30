import { NetworkStatus, ActionType } from '../../constant'

export default function(state = NetworkStatus.PENDING, action) {
    if(action.type == ActionType.NETWORKREQUEST) {
        return action.payload
    }
    return NETWORK_STATUS.OK
}