import React, {Component} from 'react'
import CategoryTree from './treeComponent'
import MainTable from './table'
import Grid from '@material-ui/core/Grid';
import './index.less'

export default class MainPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <CategoryTree/>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <canvas id="canvas" className='canvasClass'></canvas>
                        </Grid>
                        <MainTable/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}