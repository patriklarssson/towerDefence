import React from 'react';
import PlayerGameModel from '~/models/game/PlayerGameModel';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/styles';
import _ from 'lodash';
import cn from 'classnames';
import { Typography, colors, Button } from '@material-ui/core';
import TurretAttribute from '~/models/turrets/TurretAttribute';

const useStyles = makeStyles({
	container: {
		width: "100%",
		display: "flex",
		marginTop: 2
	},

	upgrade: {
		width: 100,
		display: "flex",

	},

	barHolder: {
		display: "flex",
		flex: 1,

		"& > *": {
			flex: 1,
			textAlign: "center",
			alignSelf: "center",
			lineHeight: "23px",
		}
	},

	currentValue: {
		paddingRight: 8
	},
})

const buttonStyle = (game: PlayerGameModel, turr: TurretAttribute) => {
	return {
		first: {
			backgroundColor: turr.next.price <= game.cash ? colors.green[500] : colors.red[500],
			border: (turr.next.price <= game.cash ? colors.green[500] : colors.red[500]) + " 1px solid",
			padding: "0 8px",
			width: "50%",
		},
		sec: {
			border: (turr.next.price <= game.cash ? colors.green[500] : colors.red[500]) + " 1px solid",
			padding: "0 8px",
			width: "50%",
		}
	}
}

export default observer((props: { game: PlayerGameModel }) => {
	let turr = props.game.shop.selectedTurret
	if (props.game.shop.turretToBuy)
		turr = props.game.shop.turretToBuy

	return (
		<div style={{ width: "100%" }}>
			<Upgrade game={props.game} attr={turr.attributes.damage} title="Damage" />
			<Upgrade game={props.game} attr={turr.attributes.range} title="Range" />
			<Upgrade game={props.game} attr={turr.attributes.rateOfFire} title="Rate" />
		</div>
	)
})

const Upgrade = observer((props: { game: PlayerGameModel, attr: TurretAttribute, title: string }) => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<Typography className={classes.upgrade}>
				<span className={classes.upgrade}>{props.title}</span>
				<span className={classes.currentValue}>{props.attr.value}</span>
			</Typography>
			<div className={classes.barHolder}>
				{props.attr.nextUpgrades.map((t, i) => {
					if (i == 0) {
						return (
							<Button key={t.level} variant="outlined" onClick={props.attr.upgrade} style={{ padding: 0, flex: 2 }}>
								<span style={buttonStyle(props.game, props.attr).first}>${t.price}</span>
								<span style={buttonStyle(props.game, props.attr).sec}>{t.value}</span>
							</Button>
						)
					}
					return (
						<Typography key={t.level}>
							{t.value}
						</Typography>
					)
				})}
				{props.attr.nextUpgrades.length <= 1 && <Typography color="secondary">MAX</Typography>}

			</div>
		</div>
	)
})