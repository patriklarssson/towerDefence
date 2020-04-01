import React, { useCallback } from "react"
import { makeStyles } from "@material-ui/styles"
import cn from "classnames"
import { useStore } from "~/storeContext";
import { CustomTheme } from "~/index";
import TileModel from "~/models/tiles/TileModel";
import BasicTile from "~/graphics/BasicTile";
import { observer } from "mobx-react-lite";

//#484e5d
const useStyles = makeStyles((theme: CustomTheme) => ({
	tile: {
		height: theme.custom.tileSize,
		width: theme.custom.tileSize,
		border: "1px solid rgba(238,238,238,.3)",
		// opacity: .3,
		// backgroundImage: BasicTile.backgroundImage
	},
	// tile1: {
	// 	height: theme.custom.tileSize,
	// 	width: theme.custom.tileSize,
	// 	border: "1px solid #f11e37",
	// 	boxShadow: `inset 0 0 ${theme.custom.tileSize / 2}px #f11e37`,
	// 	opacity: .7
	// },
	// tile2: {
	// 	height: theme.custom.tileSize,
	// 	width: theme.custom.tileSize,
	// 	border: "1px solid #bf00d8",
	// 	boxShadow: `inset 0 0 ${theme.custom.tileSize / 2}px #bf00d8`,
	// 	opacity: .7
	// },
	start: {
		borderTop: "none",
	},
	stop: {
		borderBottom: "none"
	},
	notWalkable: {
		// backgroundImage: "none !important"
	}

}))

interface TileProps {
	children?: any
	isEnter?: boolean
	isExit?: boolean
	model: TileModel
	onClick?: any
	onMouseEnter: (e: TileModel) => void
}


export default observer((props: TileProps) => {
	const { children, isEnter, isExit, model } = props
	const store = useStore()
	const classes = useStyles()
	const klass = cn(classes.tile, {
		[classes.start]: isEnter,
		[classes.stop]: isExit,
		[classes.notWalkable]: model && !model.walkable,
	})


	const onMouseEnter = useCallback(() => props.onMouseEnter(props.model), [props.model])
	const onClick = useCallback(() => props.onClick(props.model), [props.model])

	return (
		<div className={klass} onMouseEnter={onMouseEnter} onClick={onClick}>{children}</div>
	)
})