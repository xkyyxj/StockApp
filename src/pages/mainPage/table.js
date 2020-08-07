import React, { PureComponent } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import AddToTarget from './addToTarget'

import './table.less'

import { remote } from 'electron'
const { Menu, MenuItem } = remote

import { connect } from 'react-redux'

/**
 * 表格组件，用于展示股票详情
 */
class DataTable extends PureComponent {

    /**
     * 右键菜单模板
     */
    ContextMenuItems = [
        {
            label: '添加',
            accelerator: 'ctrl+n',
            click: () => {
                // 展示模态框
                console.log("clicked my menu")
                this.setState({
                    open: true
                })
            }
        },
    ]

    constructor(props) {
        super(props)
        this._rightButtonClickEvent = this._rightButtonClickEvent.bind(this)
        this.state = {
            open: false     // 控制模态框是否显示
        }

        // bind函数
        this.handleClose = this.handleClose.bind(this)
    }

    _formatDate(date) {
        if (date != null) {
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        return ''
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    /**
     * 处理列信息，构建表格头部
     * */
    _processTableColumn() {
        let tableColumns = this.props.tableInfo ? this.props.tableInfo.meta : null
        if (!tableColumns) {
            return
        }
        return tableColumns.map(item => {
            return (
                <TableCell>{item.display_name}</TableCell>
            )
        })
    }

    /**
     * 处理数据行，展示表体
     */
    _processTableRows() {
        let tableColumns = this.props.tableInfo && this.props.tableInfo.meta ? this.props.tableInfo.meta : null
        let tableData = this.props.tableInfo && this.props.tableInfo.datas ? this.props.tableInfo.datas : []
        return tableData.map(row => {
            return (
                <TableRow>
                    {tableColumns.map(column => {
                        // 特殊处理一下，如果列类型是date的话，格式化一下
                        let displayInfo = row[column.column_name]
                        if (column.columntype == 'date') {
                            displayInfo = this._formatDate(displayInfo)
                        }
                        return (
                            <TableCell align="center">{displayInfo}</TableCell>
                        )
                    })}
                </TableRow>
            )
        })
    }

    _rightButtonClickEvent(e) {
        let menu = Menu.buildFromTemplate(this.ContextMenuItems)
        menu.popup({ window: remote.getCurrentWindow() })
    }

    render() {
        let displayContent = this.props.tableInfo ?
            (
                <div className="tableDiv" onContextMenu={this._rightButtonClickEvent}>
                    <TableContainer component={Paper}>
                        <Table className='main-table' size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {this._processTableColumn()}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this._processTableRows()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <AddToTarget {...this.state} onClose={this.handleClose} />
                </div>
            ) : "No Data!"
        return displayContent
    }
}

function mapStateToProps(state) {
    let value = state.get('tableInfo').get('currTab')
    // 为啥下面必须要转换成字符串才能够获取出来？？？？？？？？？？
    return { tableInfo: state.get('tableInfo').get(`${value}`) }
}

export default connect(mapStateToProps)(DataTable)