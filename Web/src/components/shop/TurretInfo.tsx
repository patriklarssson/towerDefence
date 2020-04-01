import React, { useCallback } from "react"
import { observer } from "mobx-react-lite"
import PlayerGameModel from "~/models/game/PlayerGameModel"
import cn from "classnames"
import { makeStyles } from "@material-ui/styles"
import { CustomTheme } from "~/index"
import { Button, Typography, colors } from "@material-ui/core"
import UpgradeProgressBar from "./UpgradeProgressBar";

const useStyles = makeStyles((theme: CustomTheme) => ({
	container: {
		padding: 16,
		"& *": {
			color: "white",
		}
	},

	top: {
		display: "flex",
		"& > *:first-child": {
			flex: 1
		},
		marginBottom: 8
	},
	turretUpgareImageContainer: {
		display: "flex",
		alignItems: "center",
		"& > *": {
			flex: 1,
		}
	},
	sellButton: {
		// border: "1px solid " + colors.red[500],
		width: 130
	}
}))

export default observer((props: { game: PlayerGameModel }) => {
	const classes = useStyles()

	const sellTurret = useCallback(() => {
		props.game.shop.sellTurret(props.game.shop.selectedTurret)
	}, [props.game.shop.selectedTurret])


	let turr = props.game.shop.selectedTurret
	if (props.game.shop.turretToBuy)
		turr = props.game.shop.turretToBuy
	if (!turr)
		return null

	return (
		<div className={classes.container}>
			<div className={classes.top}>
				<Typography variant="h4">{turr.name}</Typography>
				{(props.game.shop.selectedTurret) && <Button variant="outlined" color="secondary" onClick={sellTurret} className={classes.sellButton}>Sell ${turr.sellPriceValue}</Button>}
			</div>
			<div className={classes.turretUpgareImageContainer}>
				<UpgradeProgressBar game={props.game} />
			</div>

		</div>
	)
})