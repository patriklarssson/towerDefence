import React from "react"
import { useStore } from "~/storeContext";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";
import PlayerGame from "./PlayerGame";
import { CustomTheme } from "~/index";
import { GameDialog } from "./GameSetup";

const useStyles = makeStyles((theme: CustomTheme) => ({
	container: {
		height: "100%",
		width: "100%",
		backgroundColor: "#000",
	},
	paper: {
		maxWidth: "none",
		backgroundColor: "#000",
		height: "100%",
		// overflow: "hidden",

	},

	header: {
		display: "flex",
		// alignItems

		padding: theme.spacing.unit
	},
	games: {
		display: "flex",
		flexDirection: "row",

	}
}))

const Game = observer(() => {
	const store = useStore()
	const classes = useStyles()

	return (
		<GameDialog paperStyles={{ overflow: "hidden" }}>
			<div className={classes.games}>
				<PlayerGame game={store.playerGame} />
			</div>
		</GameDialog>
	)
})

export default Game