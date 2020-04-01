import ProjectileModel, { ProjectileProps } from "./ProjectileModel";
import PlayerGameModel from "../game/PlayerGameModel";
import Bullet from "../../graphics/bullet.png"

const img = new Image()
img.src = Bullet
const rotation = (90 * Math.PI / 180)

export default class StraightProjectileModel extends ProjectileModel {
	constructor(playerGame: PlayerGameModel, props: ProjectileProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .1  })

		this.velocity = 20
		this.angle = Math.atan2(this.target.pxY - this.pxY, this.target.pxX - this.pxX) + rotation
	}

	angle = 0
	update = (delta: number) => {
		this.updatePosition(delta)
		this.collisionEnemy(delta)
	}

	draw = (ctx: CanvasRenderingContext2D) => {

		ctx.save()
		ctx.translate(this.pxX, this.pxY)
		ctx.rotate(this.angle)
		ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2)
		ctx.restore()
	}
}