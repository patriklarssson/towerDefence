import EnemyModel, { EnemyProps } from "./EnemyModel";
import PlayerGameModel from "../game/PlayerGameModel";
import { colors } from "@material-ui/core";


export default class SlowEnemyModel extends EnemyModel {
	constructor(playerGame: PlayerGameModel, props: EnemyProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .25, healthMultiplier: 2 })
		this.velocity = 1
	}


	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.save()

		ctx.beginPath()
		ctx.rect(this.pxX - this.radius, this.pxY - this.radius, this.radius * 2, this.radius * 2)
		ctx.strokeStyle = ctx.shadowColor = colors.pink[500]
		ctx.shadowBlur = 15
		ctx.lineWidth = 3

		ctx.stroke()
		ctx.restore()
	}
}