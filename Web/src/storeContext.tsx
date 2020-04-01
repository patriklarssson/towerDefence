import React, { useContext } from "react"
import Store, { createStore } from "./stores/Store";



export const useStore = (): Store => {
	return useContext(StoreContext)
}


export const StoreContext = React.createContext(createStore())
