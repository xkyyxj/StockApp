import React, {PureComponent, Fragment} from 'react'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux'
import { insertTableInfo, commonQuery } from '../../main/mysqlOperation'
import './addToTarget.less'

class AddToTarget extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            options: []
        }

        // 记录选定的股票
        this.selectedStock = []
        this._codeValueChange = this._codeValueChange.bind(this)

        this._confirm = this._confirm.bind(this)
    }

    _codeValueChange(event) {
        let value = event.target.value
    }

    _dateValueChange() {

    }

    _confirm() {
        // 根据当前的元数据信息添加到对应表格里面
        let sql = ''
        let tableMeta = this.props.tableInfo.meta
        switch(tableMeta.tableName) {
        case "in_low":
            let paramsPos = new Array(this.selectedStock.length).fill('?')
            paramsPos = paramsPos.join(',')
            sql = `insert into in_low(ts_code ,ts_name ,date, in_price) select stock_list.ts_code, name, CURDATE(), close from stock_base_info join stock_list on stock_list.ts_code=stock_base_info.ts_code where stock_list.ts_code in (${paramsPos}) and trade_date=(select max(trade_date) from stock_base_info)`
            let params = this.selectedStock.map(item => {
                return item.ts_code
            })
            commonQuery(sql, params)
            break
        }

        this.props.onClose()
    }

    _queryStockList() {
        // let queryRst = (async function queryStockList() {
        //     let rst = await commonQuery(`select ts_code, ts_name, industry from stock_list`, [])
        //     return rst
        // })()
        let queryRst = commonQuery(`select ts_code, name, industry from stock_list`, [])
        queryRst.then(resp => {
            let options = []
            resp.results.map(item => {
                options.push({...item})
            })
    
            this.setState({options})
        })
    }

    render() {
        let loading = this.state.open && this.state.options.length === 0;
        return (
            <Modal
                className="addToTargetModal"
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
                <div className="targetModalContent">
                    <Autocomplete
                        id="asynchronous-demo"
                        style={{ width: 300 }}
                        open={this.state.open}
                        onOpen={() => {
                            this.setState({open: true}, () => {
                                this._queryStockList()
                            })
                        }}
                        onClose={() => {
                            this.setState({open: false})
                        }}
                        getOptionSelected={(option, value) => {
                            console.log("autocomplete selected!!!!!!")
                            this.selectedStock.push(value)
                            return option.name === value.name
                        }}
                        getOptionLabel={(option) => option.name}
                        options={this.state.options}
                        loading={loading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Asynchronous"
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <TextField onChange={this._valueChange} label="加入日期"/>
                    <Button onClick={this._confirm}>确定</Button>
                    <Button onClick={this.props.onClose}>取消</Button>
                </div>
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