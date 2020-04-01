import ProjectileModel, { ProjectileProps } from "./ProjectileModel";
import PlayerGameModel from "../game/PlayerGameModel";
import Bullet from "../../graphics/bullet.png"
import { colors } from "@material-ui/core";
import _ from "lodash";

interface SurgeProjectileProps extends ProjectileProps {
	maxRadius: number
	color: string
}

const img = new Image()
img.src = Bullet

export default class SurgeProjectileModel extends ProjectileModel {
	constructor(playerGame: PlayerGameModel, props: SurgeProjectileProps) {
		super(playerGame, { ...props, radius: 0 })

		this.maxRadius = (props.maxRadius * 1.5) * playerGame.tileSize
		this.color = props.color
	}


	color = ""
	alfa = 0
	time = 500
	currentTimePercent = 0
	maxRadius = 0

	done = false
	update = (delta: number) => {

		if (this.done) {
			this.alfa -= (delta / 200) * .2
			if (this.alfa <= .0)
				this.playerGame.projectiles.splice(this.playerGame.projectiles.indexOf(this), 1)
			return
		}
		this.currentTimePercent = _.min([1, (this.currentTimePercent + (delta / this.time))])

		this.alfa = this.currentTimePercent * .3
		this.radius = this.currentTimePercent * this.maxRadius
		if (this.currentTimePercent >= 1) {
			this.done = true
		}

		this.collisionEnemies(delta)
	}

	draw = (ctx: CanvasRenderingContext2D) => {

		ctx.save()
		ctx.beginPath();
		ctx.arc(this.pxX, this.pxY, this.radius, 0, 2 * Math.PI)
		// ctx.arc(this.pxX, this.pxY, (this.attributes.range.value * 1.5) * this.game.store.tileSize, 0, 2 * Math.PI);

		ctx.fillStyle = ctx.shadowColor = this.color
		ctx.shadowBlur = 100
		ctx.globalAlpha = this.alfa
		ctx.fill()
		ctx.restore()
	}
}