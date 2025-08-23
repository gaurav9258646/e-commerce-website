import { useState } from "react";
import { createContext } from "react";
 export const appStore = createContext({});
const AppProvider = ({children})=>{

    const [sidebar,setSideber] = useState(false);

    const openSideber =()=> setSideber(true);
    const closeSideber =() => setSideber(false);
    return(

        <appStore.Provider value={{sidebar,openSideber,closeSideber}}>{children}</appStore.Provider>
    )
}

export  default AppProvider