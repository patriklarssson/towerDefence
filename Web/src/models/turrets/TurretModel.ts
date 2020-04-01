import { observable, computed, action } from "mobx";
import PlayerGameModel from "../game/PlayerGameModel";
import BaseModel from "../BaseModel";
import { colors } from "@material-ui/core";
import _ from "lodash";
import EnemyModel from "../enemies/EnemyModel";
import TurretAttribute from "./TurretAttribute";

export interface TurretProps {
	x: number
	y: number
}

export const turretLevelColors = [
	colors.blue[500],
	colors.green[500],
	colors.cyan[500],
	colors.lime[500],
	colors.orange[500],
	colors.red[500]
]

export default class TurretModel extends BaseModel {
	constructor(playerGame: PlayerGameModel, props: TurretProps & { radius: number, name: string, price: number }) {
		super()
		if (new.target === TurretModel) {
			throw new TypeError("Cannot construct Abstract instances directly");
		}

		this.playerGame = playerGame
		this.x = props.x
		this.y = props.y
		this.radius = props.radius
		this.name = props.name
		this.price = props.price
	}
	playerGame: PlayerGameModel
	clone = (): TurretModel => null

	@observable name: string

	@observable x = 2
	@observable y = 2

	@observable attributes: {
		damage: TurretAttribute
		range: TurretAttribute
		rateOfFire: TurretAttribute
	}

	@observable price = 10
	@computed get sellPriceValue() {
		return _.floor((_.sum(Object.entries(this.attributes).map(([a, b]) => b.totalPriceValue)) + this.price) / 2)
	}

	@computed get pxX() { return (this.x * this.playerGame.tileSize) + (this.playerGame.tileSize / 2) }
	@computed get pxY() { return (this.y * this.playerGame.tileSize) + (this.playerGame.tileSize / 2) }

	radius = 0


	update = (delta: number) => { }
	draw = (ctx: CanvasRenderingContext2D) => { }
	_draw = (ctx: CanvasRenderingContext2D) => {
		if (this.playerGame.shop.selectedTurret == this) {
			ctx.save()
			ctx.beginPath()
			ctx.arc(this.pxX, this.pxY, (this.attributes.range.value * 1.5) * this.playerGame.tileSize, 0, 2 * Math.PI)
			ctx.strokeStyle = "#fff"
			ctx.setLineDash([8, 32])
			ctx.stroke()
			ctx.restore()

			ctx.save()
			ctx.beginPath()
			ctx.strokeStyle = "red"
			ctx.setLineDash([16, 40])
			ctx.lineDashOffset = 8
			ctx.lineWidth = 2
			ctx.strokeRect(this.pxX - this.playerGame.tileSizeHalf + 4, this.pxY - this.playerGame.tileSizeHalf + 4, this.playerGame.tileSize - 8, this.playerGame.tileSize - 8)
			ctx.restore()
		}

		if (this.attributes.damage.level > 0)
			drawStar(ctx, this.pxX + this.playerGame.tileSizeHalf - 15, this.pxY - this.playerGame.tileSizeHalf + 15, 8, 3, getStarColor(this.attributes.damage))
		if (this.attributes.range.level > 0)
			drawStar(ctx, this.pxX + this.playerGame.tileSizeHalf - 15, this.pxY - this.playerGame.tileSizeHalf + 30, 8, 3, getStarColor(this.attributes.range))
		if (this.attributes.rateOfFire.level > 0)
			drawStar(ctx, this.pxX + this.playerGame.tileSizeHalf - 15, this.pxY - this.playerGame.tileSizeHalf + 45, 8, 3, getStarColor(this.attributes.rateOfFire))

	}


	isInRange = (enemy: EnemyModel) => {
		return Math.hypot(enemy.pxX - this.pxX, enemy.pxY - this.pxY) <= (this.attributes.range.value * 1.5) * this.playerGame.tileSize
	}

	@computed get enemiesInRange() {
		const filtered = _.filter(this.playerGame.enemies, this.isInRange)
		return _.orderBy(filtered, (x: EnemyModel) => Math.hypot(x.pxX - this.pxX, x.pxY - this.pxY))
	}

	lastFired = 0
	fire = (delta: number) => {
		if (this.lastFired > this.attributes.rateOfFire.value && this.playerGame.enemies.length > 0 && this.enemiesInRange.length > 0) {
			this.lastFired = 0
			this.onFire(this.enemiesInRange[0])
		}

		this.lastFired += delta
	}

	onFire = (enemy) => { }
}


export const rateOfFire = (rate) => {
	let lastFired = 0

	return fire => delta => {
		if (lastFired >= rate) {
			fire()
			lastFired = 0
		}
		lastFired += delta
	}
}


const getStarColor = (attr: TurretAttribute) => {
	if (attr.level == attr.maxLevel)
		return colors.red[500]
	return turretLevelColors[attr.level - 1]
}

const drawStar = (ctx: CanvasRenderingContext2D, cx, cy, outerRadius, innerRadius, color) => {
	const spikes = 5
	var rot = Math.PI / 2 * 3;
	var x = cx;
	var y = cy;
	var step = Math.PI / spikes;

	ctx.save()
	ctx.beginPath();
	ctx.moveTo(cx, cy - outerRadius)
	for (let i = 0; i < spikes; i++) {
		x = cx + Math.cos(rot) * outerRadius;
		y = cy + Math.sin(rot) * outerRadius;
		ctx.lineTo(x, y)
		rot += step

		x = cx + Math.cos(rot) * innerRadius;
		y = cy + Math.sin(rot) * innerRadius;
		ctx.lineTo(x, y)
		rot += step
	}
	ctx.lineTo(cx, cy - outerRadius);
	ctx.closePath();

	ctx.fillStyle = color
	ctx.fill()
	ctx.restore()
}