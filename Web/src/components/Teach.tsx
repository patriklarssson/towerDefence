import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { observer } from "mobx-react-lite";
import { CustomTheme } from "..";
import { makeStyles } from "@material-ui/styles";
import { colors, Button, Typography } from "@material-ui/core";
import { useStore } from "~/storeContext";
import { TeachStep } from "~/stores/TeachStore";



export default observer((props: { children: any, title: any, type: TeachStep }) => {
	const store = useStore()
	const classes = useStyles()

	return (
		<Tooltip
			placement="top"
			title={(
				<div>
					<Typography variant="subtitle1">{props.title}</Typography>

					<div>
						<Button onClick={store.teachStore.nextStep}>Ok</Button>
					</div>
				</div>
			)}
			open={store.teachStore.currentStep == props.type}
			classes={{ tooltip: classes.bg, popper: classes.popper }}

		>

			{props.children}
		</Tooltip>
	)
})


const useStyles = makeStyles((theme: CustomTheme) => {
	return {
		popper: {
			opacity: 1,
			zIndex: 5001
		},
		bg: {
			backgroundColor: colors.blue[500],
			"& *": {
				color: "#fff"
			}
		}

	}
})