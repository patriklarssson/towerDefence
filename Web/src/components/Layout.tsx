import React from "react"
import { useStore } from "~/storeContext"
import { makeStyles } from "@material-ui/styles"
import { observer } from "mobx-react-lite";
import Game from "./Game";
import GameSetup from "./GameSetup";


const useStyles = makeStyles({
	container: {
		height: "100%",
		width: "100%",
	},
})

const Layout = observer(() => {
	const store = useStore()
	const classes = useStyles()

	return (
		<div className={classes.container}>
			{!store.playerGame && <GameSetup />}
			{store.playerGame && <Game />}
		</div>
	)
})






export default Layout