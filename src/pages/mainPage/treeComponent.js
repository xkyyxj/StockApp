import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

/**
 * 主页面的左树，主要是展示类别数据
 */
export default class CategoryTree extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }

        // 加载数据
        ipcRenderer.on('allTreeInfo', (event, args) => {
            if(!args) 
                return
            this.setState({data: args.results})
        })
        ipcRenderer.send('treeInfo', 'hahahahha')

        this.onItemClicked = this.onItemClicked.bind(this)
    }

    onItemClicked(itemKey) {
        console.log(itemKey)
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
                        () => {
                            this.onItemClicked(item.pk_category)
                        }
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