import React, { useEffect, useCallback, useState, useRef } from "react"
import { observer, useDisposable, useObservable } from "mobx-react-lite";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";
import Shop from "./shop/Shop";
import TurretInfo from "./shop/TurretInfo";
import TileContainer from "./tiles/TileContainer";
import PlayerGameModel from "~/models/game/PlayerGameModel";
import { when } from "mobx";
import PlayerInfo from "./shop/PlayerInfo";
import { CustomTheme } from "..";
import GameSetup from "./GameSetup";


// const border = "2px solid #cf2de6"
const border = "2px solid rgba(238,238,238,.3)"


const useStyles = makeStyles((theme: CustomTheme) => ({
	container: {
		// display: "flex",
		// position: "relative"
		backgroundColor: "#020a1f",

	},
	gameboard: {
		"& > *": {
			position: "absolute"
		},
		"& > canvas": {
			pointerEvents: "none"
		}
	},
	info: {
		position: "relative",
		display: "flex",
		minHeight: 160,

		"& > *": {
			borderBottom: border,
			borderLeft: border,

			"&:first-of-type": {
				width: 64 * 3
			},

			"&:last-of-type": {
				borderRight: border,
				width: 64 * 2
			},
		}

	},
	turretInfo: {
		flexGrow: 1
	}
}))

export default observer((props: { game: PlayerGameModel }) => {
	const classes = useStyles()
	const ref = useObservable(useRef(null))

	useDisposable(() =>
		when(
			() => ref.current != null,
			() => {
				props.game.context = ref.current.getContext("2d")
			}
		)
	)

	return (
		<React.Fragment>
			<div className={classes.container}>
				<div style={{ display: "flex" }}>
					<div style={{ width: props.game.widthPx, height: props.game.heightPx }} className={classes.gameboard}>
						<TileContainer game={props.game} />
						<canvas ref={ref} height={props.game.heightPx} width={props.game.widthPx}></canvas>
					</div>
					<div style={{ color: "#fff", display: "flex", flexDirection: "column" }}>
						<Shop game={props.game} />
						<div style={{ flexGrow: 1 }}></div>
						<PlayerInfo game={props.game} />

					</div>
				</div>
				<div className={classes.info}>
					{/* <Shop game={props.game} /> */}
					<div className={classes.turretInfo}>

						<TurretInfo game={props.game} />

					</div>
				</div>
			</div>
			{props.game.lives <= 0 && <GameSetup />}
		</React.Fragment>
	)
})

