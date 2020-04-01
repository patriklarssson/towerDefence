import React, { useEffect, useCallback, useState } from "react"
import { useStore } from "~/storeContext";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";
import Tile from "./Tile";
import PlayerGameModel from "~/models/game/PlayerGameModel";

const useStyles = makeStyles({
	tiles: {
		display: "flex",
		flexWrap: "wrap",
	},

})

export default observer((props: { game: PlayerGameModel }) => {
	const { game } = props
	const classes = useStyles()

	const styles = {
		height: game.heightPx,
		width: game.widthPx,
	}
	return (
		<div className={classes.tiles} style={styles}>
			{Array.from(game.tiles).map(([key, tile], i) => (
				<Tile
					key={key}
					isEnter={_.isEqual(key, `${game.enterTile.x}_${game.enterTile.y}`)}
					isExit={_.isEqual(key, `${game.exitTile.x}_${game.exitTile.y}`)}
					onMouseEnter={game.hoverTile}
					onClick={game.clickTile}
					model={tile}
				>
					{/* <div style={{color:"#fff"}}>{`${tile.x}_${tile.y}`}</div> */}
				</Tile>
			))}
		</div>
	)
})
