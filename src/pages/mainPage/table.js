import React, { PureComponent } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { queryAllGridData } from '../../main/mysqlOperation'
import { connect } from 'react-redux'

/**
 * 表格组件，用于展示股票详情
 */
class DataTable extends PureComponent {
    constructor(props) {
        super(props)
    }

    _processTableColumn() {
        let tableColumns = this.props.tableInfo ? this.props.tableInfo.meta : null
        if(!tableColumns) {
            return
        }
        return tableColumns.map(item => {
            return (
                <TableCell>{item.display_name}</TableCell>
            )
        })
    }

    render() {
        this._processTableColumn()
        return (
            <TableContainer component={Paper}>
                <Table className='main-table' aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {this._processTableColumn()}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

function mapStateToProps(state) {
    let value = state.get('tableInfo').get('currTab')
    // 为啥下面必须要转换成字符串才能够获取出来？？？？？？？？？？
    return {tableInfo: state.get('tableInfo').get(`${value}`)}
}

export default connect(mapStateToProps)(DataTable)