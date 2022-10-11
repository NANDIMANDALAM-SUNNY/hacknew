import { createContext,useState } from "react";


const storeContext = createContext();

export function StoreProvider({chilren}){

    const [token,setToken] = useState("10")



    return(
        <storeContext.Provider value={{token,setToken}}>
            {chilren}
        </storeContext.Provider>
    )
}





export default storeContext