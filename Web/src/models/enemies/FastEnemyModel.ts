import EnemyModel, { EnemyProps } from "./EnemyModel";
import PlayerGameModel from "../game/PlayerGameModel";
import { colors } from "@material-ui/core";


export default class FastEnemyModel extends EnemyModel {
	constructor(playerGame: PlayerGameModel, props: EnemyProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .25 , healthMultiplier: .5 })
		this.velocity = 2
	}


	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.save()
		ctx.beginPath()
		ctx.moveTo(this.pxX - this.radius, this.pxY + this.radius)

		ctx.lineTo(this.pxX, this.pxY - this.radius)
		ctx.lineTo(this.pxX + this.radius, this.pxY + this.radius)
		ctx.lineTo(this.pxX - this.radius, this.pxY + this.radius)

		ctx.strokeStyle = ctx.shadowColor = colors.cyan[500]
		ctx.shadowBlur = 15
		ctx.lineWidth = 3

		ctx.stroke()
		ctx.restore()
	}
}