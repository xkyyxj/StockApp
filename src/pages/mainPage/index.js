import React, {Component, Fragment} from 'react'
import CategoryTree from './treeComponent'
import MainTable from './table'
import './index.less'

export default class MainPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container">
                <div className="leftTree">
                    <CategoryTree/>
                </div>
                <div className="rightContent">
                    <div className="canvasFragment">
                        <canvas id="canvas" className='canvasClass'></canvas>
                    </div>
                    <div className="mainTableFragment">
                        <MainTable/>
                    </div>
                </div>
            </div>
        )
    }
}