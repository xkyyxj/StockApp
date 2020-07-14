import React, {PureComponent, Fragment} from 'react'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux'

class AddToTarget extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={this.props.open}
                onClose={this.props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={this.props.open}>
                    <TextField label="股票编码"/>
                    <TextField label="加入日期"/>
                    <Button>确定</Button>
                    <Button>取消</Button>
                </Fade>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    let value = state.get('tableInfo').get('currTab')
    // 为啥下面必须要转换成字符串才能够获取出来？？？？？？？？？？
    return {tableInfo: state.get('tableInfo').get(`${value}`), currTab: value}
}

export default connect(mapStateToProps)(AddToTarget)