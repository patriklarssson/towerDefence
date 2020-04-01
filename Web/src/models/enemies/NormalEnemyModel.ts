import EnemyModel, { EnemyProps } from "./EnemyModel";
import PlayerGameModel from "../game/PlayerGameModel";
import { colors } from "@material-ui/core";


export default class NormalEnemyModel extends EnemyModel {
	constructor(playerGame: PlayerGameModel, props: EnemyProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .25, healthMultiplier: 1 })
		this.velocity = 1.5
	}


	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.save()

		ctx.beginPath()
		ctx.arc(this.pxX, this.pxY, this.radius, 0, 2 * Math.PI)
		ctx.strokeStyle = ctx.shadowColor = colors.orange[500]
		ctx.shadowBlur = 15
		ctx.lineWidth = 3

		ctx.stroke()
		ctx.restore()

	}
}