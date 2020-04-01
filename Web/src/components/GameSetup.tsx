import React, { useEffect } from "react"
import { useStore } from "~/storeContext";
import { observer } from "mobx-react-lite";
import { Button, List, ListItem, ListItemText, Dialog, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";
import Tile from "./tiles/Tile";


const useStyles = makeStyles({
	container: {
		backgroundColor: "#020a1f",
		height: "100%",
		width: "100%",
		overflow: "hidden",
	},
	bg: {
		position: "absolute",
		display: "flex",
		flexWrap: "wrap",
		overflow: "hidden",
		width: "110%",
		opacity: .4
	},

	dialogButtons: {
		backgroundColor: "#020a1f",
		minWidth: 400,
		// minHeight: 400,
	},
	titleContainer: {
		textAlign: "center"
	},
	title: {
		position: "relative",
		marginBottom: 50,
		backgroundColor: "transparent"
	},
	paperClass: {
		backgroundColor: "transparent",
		maxWidth: "none",
		// top: "-10%",

	}
})

export default observer(() => {
	const store = useStore()
	const classes = useStyles()

	// start game on load
	// useEffect(() => {
	// 	store.connect()
	// 	store.createGame()
	// 	store.games[0].joinGame(store.playerId)
	// }, [])

	return (
		<GameDialog>
			<div className={classes.titleContainer}>
				<Typography variant="h2" color="secondary" className={classes.title}>Neon TD</Typography>
			</div>
			<div className={classes.dialogButtons}>
				<Button onClick={store.createGame} color="secondary" size="large" variant="outlined" fullWidth>Start</Button>
				<Button onClick={store.createGame} color="secondary" size="large" variant="outlined" fullWidth>Info</Button>
			</div>

			
			{/* <List>
					{store.games.map(x => (
						<ListItem color="secondary" button key={x.id} onClick={() => x.joinGame(store.playerId)}>
							<ListItemText color="secondary" primary={x.name} secondary="Join" />
						</ListItem>
					))}
				</List> */}
		</GameDialog>

	)
})



export const GameDialog = observer(({ children, paperStyles }: any) => {
	const classes = useStyles()
	return (
		<div className={classes.container}>
			<div className={classes.bg}>
				{_.times(1000, i => (
					<Tile key={i} model={undefined} onMouseEnter={undefined} />
				))}
			</div>
			<Dialog open={true} PaperProps={{ className: classes.paperClass, style: paperStyles }}>
				{children}
			</Dialog>
		</div>
	)
})

// export default observer(() => {
// 	const store = useStore()
// 	const classes = useStyles()

// 	// start game on load
// 	// useEffect(() => {
// 	// 	store.connect()
// 	// 	store.createGame()
// 	// 	store.games[0].joinGame(store.playerId)
// 	// }, [])

// 	return (
// 		<div className={classes.container}>
// 			<div className={classes.bg}>
// 				{_.times(1000, i => (
// 					<Tile key={i} model={undefined} onMouseEnter={undefined} />
// 				))}
// 			</div>
// 			<Dialog open={true} PaperProps={{ className: classes.paperClass }}>
// 				<div className={classes.titleContainer}>
// 					<Typography variant="h2" color="secondary" className={classes.title}>Neon TD</Typography>
// 				</div>
// 				<div className={classes.dialogButtons}>
// 					<Button onClick={store.createGame} color="secondary" size="large" variant="outlined" fullWidth>Start</Button>
// 					<Button onClick={store.createGame} color="secondary" size="large" variant="outlined" fullWidth>Info</Button>
// 				</div>
// 				{/* <List>
// 					{store.games.map(x => (
// 						<ListItem color="secondary" button key={x.id} onClick={() => x.joinGame(store.playerId)}>
// 							<ListItemText color="secondary" primary={x.name} secondary="Join" />
// 						</ListItem>
// 					))}
// 				</List> */}
// 			</Dialog>

// 		</div>
// 	)
// })