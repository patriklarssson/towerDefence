import ProjectileModel, { ProjectileProps } from "./ProjectileModel";
import PlayerGameModel from "../game/PlayerGameModel";
import { colors } from "@material-ui/core";

const rotation = (90 * Math.PI / 180)
export default class SmallLaserProjectileModel extends ProjectileModel {
	constructor(playerGame: PlayerGameModel, props: ProjectileProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .1 })

		this.velocity = 50
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
		

		ctx.fillStyle = "#fff"

		ctx.fillRect(-(this.radius / 2), -(this.radius * 4), this.radius / 2, this.radius * 4)

		
		ctx.strokeStyle = "#9ef5df" // "#5bedc6" //colors.lightGreen[200]
		ctx.shadowColor = "#9ef5df" // "#5bedc6" //colors.green[500]
		ctx.shadowBlur = 50
		ctx.lineWidth = 2
		ctx.strokeRect(-(this.radius / 2), -(this.radius * 4), this.radius / 2, this.radius * 4)
		ctx.restore()
	}
}