import { useState} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";

interface TreeItem {
    id: string,
    content: string,
    children: TreeItem[],
}

const TreeComponent: React.FC = () => {
    const [items, setItems] = useState<TreeItem[]>([
        {id: 'item-1', content: 'Element 1', children: []},
        {id: 'item-2', content: 'Element 2', children: []},
        {id: 'item-3', content: 'Element 3', children: []},
    ])

    const onDragEnd = (result: DropResult) => {
        if(!result.destination) return
        const {source, destination} = result
        const newItems = [...items]

        if(source.droppableId === 'droppable' && destination.droppableId === 'droppable') {
            const [removed] = newItems.splice(source.index, 1)
            newItems.splice(destination.index, 0, removed)
        } else if (source.droppableId === 'droppable' && destination.droppableId.startsWith('child-')) {
            const sourceItem = newItems[source.index]
            const destinationChildIndex = Number(destination?.droppableId.replace('child-', ''))
            const destinationItem = newItems[destinationChildIndex]
            destinationItem.children.push(sourceItem)
            newItems.splice(source.index, 1)
        } else if(source.droppableId.startsWith('child-') && destination.droppableId === 'droppable') {
            const sourceChildIndex = Number(source.droppableId.replace('child-', ''))
            const sourceItem = newItems[sourceChildIndex].children[source.index]
            newItems.splice(destination.index, 0, sourceItem)
            newItems[sourceChildIndex].children.splice(source.index, 1)
        }

        setItems(newItems)
    }

    const removeItem = (parentId: number, index: number) => {
        const newItems = [...items]
        newItems[parentId].children.splice(index, 1)
        setItems(newItems)
    }

    const addItem = (parentId: number) => {
        const newItem: TreeItem = {id: `item-${items.length + 1}`, content: `Element ${items.length + 1}`, children: []}
        const newItems = [...items]
        newItems[parentId].children.push(newItem)
        setItems(newItems)
    }

    return (
        <div>
            <button onClick={() => addItem(0)}>Add Item</button>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable draggableId={item.id} index={index} key={item.id}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.content}
                                            <Droppable droppableId={`child-${index}`} direction={"horizontal"}>
                                                {(provided) => (
                                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                                        {item.children.map((child, childIndex) => (
                                                            <Draggable draggableId={child.id} index={childIndex} key={child.id}>
                                                                {(provided) => (
                                                                    <li ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        {child.content}
                                                                        <button onClick={() => removeItem(index, childIndex)}>Remove</button>
                                                                    </li>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </ul>
                                                )}
                                            </Droppable>
                                        </li>
                                    )}
                                </Draggable>
                                ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default TreeComponent