import React, { useCallback } from "react"
import { observer } from "mobx-react-lite"
import PlayerGameModel from "~/models/game/PlayerGameModel";
import { makeStyles } from "@material-ui/styles";
import { CustomTheme } from "~/index";
import { Typography, LinearProgress, Button } from "@material-ui/core";
import { Favorite, AttachMoney, Waves } from "@material-ui/icons";
import _ from "lodash";
import Teach from "../Teach";
import { TeachStep } from "~/stores/TeachStore";




const useStyles = makeStyles((theme: CustomTheme) => ({
	container: {
		"& > *": {
			padding: "0px 0px",
			display: "flex",
			alignItems: "center",
		},
		"& *": {
			color: "#fff",

		},

		"& svg": {
			width: 48
		}
	}
}))


export default observer((props: { game: PlayerGameModel }) => {
	const { game } = props

	const classes = useStyles()
	return (

		<div className={classes.container}>
			<LinearProgress color="secondary" variant="determinate" style={{ marginTop: 2 }} value={Math.abs(_.floor((game.waveHandler.currentIntervalRemainingPercent * 100) - 100))} />
			<Button color="secondary" variant="outlined" fullWidth style={{ marginTop: 2 }} onClick={game.sendNextWave}>Next wave</Button>
			<div style={{ flexGrow: 1 }}>&nbsp;</div>

			<Typography variant="h6"><Waves />{game.waveHandler.wave}</Typography>
			<Typography variant="h6"><AttachMoney />{game.cash}</Typography>
			<Typography variant="h6"><Favorite />{game.lives}</Typography>

			<div style={{ flexGrow: 1 }}>&nbsp;</div>
			<Teach title="Play/Pause" type={TeachStep.play}>

				<Button color="secondary" variant="outlined" fullWidth onClick={game.togglePause} style={{ marginBottom: 1 }}>{!game.paused ? "Pause" : "Play"}</Button>
			</Teach>

		</div>

	)
})