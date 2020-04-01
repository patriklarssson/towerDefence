import ProjectileModel, { ProjectileProps } from "./ProjectileModel";
import PlayerGameModel from "../game/PlayerGameModel";
import Bullet from "../../graphics/bullet.png"
import _ from "lodash";
import SurgeProjectileModel from "./SurgeProjectileModel";
import { colors } from "@material-ui/core";

const img = new Image()
img.src = Bullet

const rotation = (90 * Math.PI / 180)

export default class RocketProjectileModel extends ProjectileModel {
	constructor(playerGame: PlayerGameModel, props: ProjectileProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .1 })

		this.velocity = 2
		this.parts = _.times(50, () => new Particle())
	}

	angle = 0
	update = (delta: number) => {
		const target = this.playerGame.enemies.find(x => x.id == this.target.id)
		if (target) {
			this.updateTarget(target.pxX, target.pxY)
			// this.angle = Math.atan2(this.target.pxY - this.pxY, this.target.pxX - this.pxX) + nintyDegrees

		}


		const prevPos = { pxX: this.pxX, pxY: this.pxY }

		this.updatePosition(delta)
		this.parts.forEach(x => x.update())


		this.angle = Math.atan2(this.pxY - prevPos.pxY, this.pxX - prevPos.pxX) + rotation
		const hit = this.collisionEnemy(delta)
		if (hit) {
			this.playerGame.projectiles.push(new SurgeProjectileModel(this.playerGame, { pxX: this.pxX, pxY: this.pxY, maxRadius: .5, damage: _.ceil(this.damage / 2), color: colors.yellow[200] }))
		}


	}
	parts = []

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.save()
		ctx.translate(this.pxX, this.pxY)
		ctx.rotate(this.angle)
		ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2)
		this.parts.forEach(x => x.draw(ctx))

		ctx.restore()

		ctx.save()
	}
}















function Random(range) {
	return Math.floor((Math.random() * range) + 1);
}
function RandomFloat(range) {
	return (Math.random() * range) + 1;
}
class Particle {
	constructor() {
		this.reset()
	}
	pxX = Random(6)
	pxY = 0
	radius = 4
	opacity = 255
	greenFactor = 255
	wind = 0
	color = "rgb(255,255,0)"

	reset = function () {
		this.wind = 0
		this.speed = RandomFloat(5) - 10
		this.radius = 4
		this.opacity = 255
		this.greenFactor = 255
		this.color = 'rgb(255,255,0)'
		this.pxX = Random(6)
		this.pxY = 0
	}
	update = function () {
		if (this.pxY < (-50) || this.radius <= 1) {
			this.reset()
		}
		this.radius += 20 / (300 / this.speed)
		this.opacity += 255 / (300 / this.speed)
		this.greenFactor += 255 / ((300 * 2) / this.speed)
		this.color = "rgb(255," + (Math.floor(this.greenFactor) + 1) + ",0)"
		this.pxX -= this.wind
		this.pxY -= this.speed
	}
	draw = function (ctx: CanvasRenderingContext2D) {
		ctx.save()
		ctx.beginPath();
		ctx.arc(this.pxX - this.radius, this.pxY + 6, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.globalAlpha = this.opacity / 255;
		ctx.fill();
		ctx.closePath();
		ctx.restore()

	};
}
