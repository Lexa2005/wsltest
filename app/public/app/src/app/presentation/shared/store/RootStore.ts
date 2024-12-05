import {createContext, useContext} from "react";

class RootStore {
    constructor() {
    }
}

const rootStore = new RootStore();
const storeContext = createContext(rootStore);
export const useRootStore = () => useContext(storeContext);
