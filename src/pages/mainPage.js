import React, {Component} from 'react'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

export default class MainPage extends Component {
    constructor(props) {
        super(props)
    }

    treeItemClicked(param1, param2, param3, param4, param5, param6) {
        console.log(param1)
        console.log(param2)
        console.log(param3)
        console.log(param4)
        console.log(param5)
        console.log(param6)
    }

    render() {
        return(
            <div>
                hahahahahahhah
                <canvas id="myCanvas" width="200" height="100"></canvas>

                <TreeView>
                    <TreeItem nodeId="1" label="Applications">
                        <TreeItem nodeId="2" label="Calendar" onLabelClick={this.treeItemClicked}/>
                        <TreeItem nodeId="3" label="Chrome" />
                        <TreeItem nodeId="4" label="Webstorm" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                        <TreeItem nodeId="10" label="OSS" />
                        <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                            <TreeItem nodeId="8" label="index.js" />
                            <TreeItem nodeId="9" label="tree-view.js" />
                        </TreeItem>
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </div>
        )
    }
}