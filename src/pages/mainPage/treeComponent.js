import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { connect } from 'react-redux'

import { queryAllGridData, queryAllTree } from '../../main/mysqlOperation'
import { ActionType } from '../../constant'

/**
 * 主页面的左树，主要是展示类别数据
 */
class CategoryTree extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }

        // 加载数据
        // ipcRenderer.on('allTreeInfo', (event, args) => {
        //     if(!args)
        //         return
        //         console.log("hahahahhahah")
        //     console.log(args)
        //     this.setState({data: args.results})
        // })
        // ipcRenderer.send('treeInfo', 'hahahahha')
        let treeDataPromise = queryAllTree()
        treeDataPromise.then(resp => {
            if(!resp.results) {
                return
            }
            console.log(resp.results)
            this.setState({data: resp.results})
        })

        this.onItemClicked = this.onItemClicked.bind(this)
    }

    /**
     * 树节点的点击事件，发送react-redux事件，然后存储数据
     * @param {*} allData 节点的所有数据，其实就是数据库记录
     */
    onItemClicked(allData) {
        this.props.dispatch(dispatch => {

            let retPromise = queryAllGridData(allData)
            retPromise.then(resp => {
                let lastResult = {
                    [allData]: {
                        meta: resp[0].results,
                        datas: resp[1].results
                    },
                    currTab: allData
                }
                dispatch({
                    type: ActionType.TableData,
                    payload: lastResult
                })
            })

            // ipcRenderer.once('allTableInfo', (event, args) => {
            //     if(!args)
            //         return
            //     // 规整一下表格数据格式
                
            // })
            // ipcRenderer.send('tableInfo', {pk_tablemeta: allData})
        })
    }

    /**
     * 根据传入的数组，按照上下层关系构建一颗树层级出来
     */
    _constructTreeHierarchy() {
        let targetData = []
        this.state.data.forEach(item => {
            targetData.push(Object.assign({}, item))
        })

        let loop = (root, targetData) => {
            for(let i = targetData.length - 1;i >= 0;i--) {
                if(targetData[i].pk_parent == root.pk_category) {
                    root.child.push({...targetData[i], child:[]})
                    targetData.splice(i, 1)
                }
            }
            root.child.forEach(item => {
                loop(item, targetData)
            })
        }
        let hierarchy = []

        // 摘出最顶层的节点
        for(let i = targetData.length - 1;i >= 0;i--) {
            if(!targetData[i].pk_parent) {
                hierarchy.push({...targetData[i], child:[]})
            }
        }
        hierarchy.forEach(item => {
            loop(item,targetData)
        })
        return hierarchy
    }

    /**
     * 根据上面的_constructTreeHierarchy构建出来的层级结构
     * 构建真正的树UI节点层级结构
     */
    _constructTreeItem() {
        let hierarchy = this._constructTreeHierarchy()
        let loop = items => {
            return items.map(item => {
                return (
                    <TreeItem key={item.pk_category} nodeId={item.pk_category} label={item.category_name} onLabelClick={
                        this.onItemClicked.bind(this,item.pk_tablemeta)
                    }>
                        {loop(item.child)}
                    </TreeItem>
                )
            })
        }
        return loop(hierarchy)
    }

    render() {
        return (
            <TreeView>
                {this._constructTreeItem()}
            </TreeView>
        )
    }
}

export default connect()(CategoryTree)