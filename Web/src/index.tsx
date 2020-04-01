import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
// import "typeface-roboto"
import Store, { createStore } from "./stores/Store";
import { StoreContext } from "./storeContext";
import Layout from "./components/Layout";
import { ThemeProvider } from "@material-ui/styles";
import { Theme, CssBaseline, createMuiTheme } from "@material-ui/core";
import Sprites, { SpriteContext } from "./graphics/Sprites";


const store: Store = createStore()

// if (!store.currentGame) {
// 	store.connect()
// 	store.createGame()
// 	store.games[0].joinGame(store.playerId)
// 	store.currentGame.start()
// }

export interface CustomTheme extends Theme {
	custom: {
		tileSize: number
	}
}

const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	overrides:{
		MuiTypography:{
			subtitle1:{
				
			}
		}
	}
})

const customTheme = {
	...theme,
	custom: {
		tileSize: store.tileSize
	}
}



const App = () => {
	const [state, setState] = useState(null)

	return (
		<SpriteContext.Provider value={state}>
			<StoreContext.Provider value={store}>
				<ThemeProvider theme={customTheme as Theme}>
					<CssBaseline />
					{/* {!state && (<Sprites loaded={setState} />)} */}
					{/* {state && (<Layout />)} */}
					<Layout />

				</ThemeProvider>
			</StoreContext.Provider>
		</SpriteContext.Provider>
	)
}




ReactDOM.render(<App />, document.querySelector("#app"))

declare var module
if (module.hot) {
	module.hot.accept()
}