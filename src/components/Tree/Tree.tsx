import * as Styled from "./TreeStyled"
import {ReactNode, useCallback, useRef} from "react";
// import TreeItemContext from "./TreeItemContext.ts";
import TreeContext from "./TreeContext.ts";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import TreeItem from "./TreeItem.tsx";

type TreeNode = {
    id: string
    label: ReactNode
    children?: TreeNode[]
}

type TreeProps = {
    data: TreeNode[]
    expanded?: string[];
    onExpand?: (nodeIds: string[]) => void
}

const Tree = ({data, expanded, onExpand}: TreeProps) => {
    console.log(data)
    const nodeIndexRef = useRef<number>(0);
    // const arr = Children.toArray(children)

    const isExpanded = useCallback(
        (nodeId: string) => {
            return expanded ? expanded.includes(nodeId) : false
        },
        [expanded]
    )

    const getIndex = useCallback(
        (nodeId: string) => {
            const flattenedNodes = flattenNodes(data)
            const nodeIndex = flattenedNodes.findIndex((node) => node.id === nodeId)
            return nodeIndex !== -1 ? nodeIndex : 0
        },
        [data]
    )

    const toggleNode = useCallback(
        (nodeId: string) => {
            if(onExpand && expanded) {
                if(isExpanded(nodeId))
                {
                    onExpand(expanded.filter((id) => id !== nodeId))
                } else {
                    onExpand([...expanded, nodeId])
                }
            }
        },
        [expanded, onExpand, isExpanded]
    )

    const flattenNodes = (nodes: TreeNode[]) : TreeNode[] => {
        let flattend: TreeNode[] = []
        nodes.forEach((node) => {
            flattend.push(node);
            if(node.children && node.children.length > 0) {
                flattend = flattend.concat(flattenNodes(node.children))
            }
        })
        return flattend
    }

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node: TreeNode, index) => {
            const children = node.children ? renderTreeNodes(node.children) : undefined
            return (
                <TreeItem key={node.id} nodeId={node.id} label={node.label}>
                    {children}
                </TreeItem>
            )
        })
    }

    const childrenIncressed = renderTreeNodes(data)

    const contextValue = {
        isExpanded, toggleNode, getIndex
    }

    return (
        <TreeContext.Provider value={contextValue}>
            <DragDropContext
                onDragEnd={e => console.log(e)}
                onDragUpdate={e => console.log(e)}
            >
                <Droppable droppableId="tree" type="TREE">
                    {(provided, ) => (
                        <Styled.Root
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            role="tree"
                        >
                            {childrenIncressed}
                            {provided.placeholder}
                        </Styled.Root>
                    )}
                </Droppable>
            </DragDropContext>
        </TreeContext.Provider>
    )

}

export default Tree