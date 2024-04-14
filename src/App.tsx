import Tree from "./components/Tree/Tree.tsx";
import {useState} from "react";
import TreeComponent from "./components/dndTree.tsx";
// import TreeItem from "./components/Tree/TreeItem.tsx";

function App() {
    const [expanded, setExpanded] = useState<string[]>([])

    const handleExpand = (nodeIds: string[]) => {
        setExpanded(nodeIds)
    }

    const treeData = [
        {
            id: "1",
            label: "Node 1",
            children: [
                {
                    id: "2",
                    label: "Node 1.1"
                },
                {
                    id: "3",
                    label: "Node 1.2",
                    children: [
                        {
                            id: "4",
                            label: "Node 1.2.1"
                        },
                        {
                            id: "5",
                            label: "Node 1.2.2"
                        },
                    ],
                },
            ],

        },
        {
            id: "8",
            label: "Node 2",
            children: [
                {
                    id: "7",
                    label: "Node 2.1",
                },
                {
                    id: "8",
                    label: "Node 2.2"
                }
            ]
        }
    ]

  return (
    <div className="App">
      <h1>Hello from App component</h1>
        {/*<Tree data={treeData} expanded={expanded} onExpand={handleExpand} />*/}
        <TreeComponent />
    </div>
  )
}

export default App
