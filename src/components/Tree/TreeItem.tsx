import React, {Children, isValidElement, useContext} from "react";
import TreeContext from "./TreeContext.ts";
import TreeItemContext from "./TreeItemContext.ts";
import * as Styled from "./TreeItemStyle.ts"
import {Draggable} from "react-beautiful-dnd";

type TreeItemProps = {
    children?: React.ReactNode;
    nodeId: string
    label: React.ReactNode
}

const TreeItem: React.FC<TreeItemProps> = ({children, label, nodeId}) => {
    const {isExpanded, toggleNode, getIndex} = useContext(TreeContext)!;
    const {level, siblingsLength, index} = useContext(TreeItemContext)!

    const arr = Children.toArray(children)

    const childrenIncressed = arr.map((child, index) => {
        if (isValidElement(child)) {
            const contextValue = {
                index,
                level: level + 1,
                siblingsLength: arr.length
            }
            return (
                <TreeItemContext.Provider key={index} value={contextValue}>
                    {child}
                </TreeItemContext.Provider>
            )
        }
        return null
    })


    const expandable = arr.length > 0
    const expanded = expandable ? isExpanded(nodeId) : undefined
    const expandedIcon = expanded ? "-" : "+"
    const absoluteIndex = getIndex(nodeId)

    return (
        <Draggable index={absoluteIndex} draggableId={nodeId}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Styled.Root
                        style={provided.draggableProps.style}
                        level={level}
                        id={nodeId}
                        tabIndex={0}
                        aria-posinset={index + 1}
                        aria-expanded={expanded}
                        aria-level={level}
                        aria-setsize={siblingsLength}
                        role="treeitem"
                    >
                        <Styled.Icon onClick={() => toggleNode(nodeId)}>
                            {expanded && expandedIcon}
                        </Styled.Icon>
                        <Styled.Label>{label}</Styled.Label>
                    </Styled.Root>
                    {expanded && childrenIncressed}
                </div>
            )}
        </Draggable>
    )
}

export default TreeItem