import React, { useCallback } from "react"
import { observer } from "mobx-react-lite"
import PlayerGameModel from "~/models/game/PlayerGameModel"
import cn from "classnames"
import { makeStyles } from "@material-ui/styles"
import { CustomTheme } from "~/index"
import { Button, Typography } from "@material-ui/core"
import UpgradeProgressBar from "./UpgradeProgressBar";
import QuestIcon from "../../graphics/quest.png"
import { useStore } from "../../storeContext";

const useStyles = makeStyles((theme: CustomTheme) => ({
    container: {
        height: "100%",
        width: "100%"
    },
    questIcon: {
        backgroundImage: `url(${QuestIcon})`,
        height: "110px",
        width: "100px",
        backgroundSize: "100% 100%"
    },
    activeQuests: {
        width: "50%",
        height: "100%",
        float: "left",
    },
    availableQuests:{
        width: "50%",
        height: "100%",
        float: "left"
    },
    header: {
        textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 10px #861da2, 0 0 15px #861da2, 0 0 20px #861da2, 0 0 25px #861da2, 0 0 35px #861da2",
        color: "white",
        textAlign: "center",
        fontFamily: "monospace",
        fontSize: "2em"
    }
}))

export default observer((props: { game: PlayerGameModel }) => {
	const classes = useStyles()


        //<div className={classes.questIcon}></div>

        const quests = props.game.activeQuests

        

	return (
		<div className={classes.container}>
            <div className={classes.availableQuests}>
                <h2 className={classes.header}>Available quests</h2>
            </div>

            <div className={classes.activeQuests}>
                <h2 className={classes.header}>Active quests</h2>
            </div>
		</div>
	)
})