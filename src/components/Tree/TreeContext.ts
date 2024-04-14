import {createContext} from "react";

type TreeContext = {
    isExpanded: (nodeId: string) => boolean;
    toggleNode: (nodeId: string) => void;
    getIndex: (nodeId: string) => number;
}

export default createContext<TreeContext | null>(null)