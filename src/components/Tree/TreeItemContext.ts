import {createContext} from "react";

type TreeItemContext = {
    level: number
    siblingsLength: number
    index: number
}

export default createContext<TreeItemContext>({
    level: 0,
    siblingsLength: 1,
    index: 0,
})