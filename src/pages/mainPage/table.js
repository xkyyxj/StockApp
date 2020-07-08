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

    componentDidMount() {
        let prom = queryAllGridData(2)
        prom.then(resp => {
            console.log("123")
        })
        console.log(this.props.tableInfo)
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table className='main-table' aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
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
    console.log(value)
    return {tableInfo: state.get('tableInfo').get(value)}
}

export default connect(mapStateToProps)(DataTable)