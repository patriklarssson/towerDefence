import React, { useCallback } from "react"
import { observer } from "mobx-react-lite"
import CannonTurretModel from "~/models/turrets/CannonTurretModel";
import PlayerGameModel from "~/models/game/PlayerGameModel";
import useTurretStyles from "./useTurretStyles";
import RocketTurretModel from "~/models/turrets/RocketTurretModel";
import SurgeTurretModel from "~/models/turrets/SurgeTurretModel";
import { Typography, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import cn from "classnames";


const useStyles = makeStyles({
	red: {},
	text: {
		color: "#fff",
		textAlign: "center",
		marginTop: -8,
		"&$red": {
			color: colors.red[500]
		}
	}
})

export default observer((props: { game: PlayerGameModel }) => {
	const { game } = props

	const turretClasses = useTurretStyles()
	const classes = useStyles()

	const cannon = new CannonTurretModel(game, { x: -1, y: -1 })
	const rocket = new RocketTurretModel(game, { x: -1, y: -1 })
	const surge = new SurgeTurretModel(game, { x: -1, y: -1 })
	const sniper = new SurgeTurretModel(game, { x: -1, y: -1 })

	const selectCannon = useCallback(() => game.shop.selectTurretFromShop("cannon"), [0])
	const selectRocket = useCallback(() => game.shop.selectTurretFromShop("rocket"), [0])
	const selectSurge = useCallback(() => game.shop.selectTurretFromShop("surge"), [0])
	const selectSniper = useCallback(() => game.shop.selectTurretFromShop("sniper"), [0])
	return (
		<div className={turretClasses.container}>
			<div>
				<div className={turretClasses.CannonTurret} onClick={selectCannon}></div>
				<Typography variant="subtitle1" className={cn(classes.text, { [classes.red]: cannon.price > game.cash })}>${cannon.price}</Typography>
			</div>
			<div>
				<div className={turretClasses.RocketTurret} onClick={selectRocket}></div>
				<Typography variant="subtitle1" className={cn(classes.text, { [classes.red]: rocket.price > game.cash })}>${rocket.price}</Typography>
			</div>
			<div>
				<div className={turretClasses.SurgeTurret} onClick={selectSurge}></div>
				<Typography variant="subtitle1" className={cn(classes.text, { [classes.red]: surge.price > game.cash })}>${surge.price}</Typography>
			</div>
			<div>
				<div className={turretClasses.SniperTurret} onClick={selectSniper}></div>
				<Typography variant="subtitle1" className={cn(classes.text, { [classes.red]: sniper.price > game.cash })}>${sniper.price}</Typography>
			</div>

		</div>
	)
})