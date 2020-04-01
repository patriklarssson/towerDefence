import { observable, reaction } from "mobx"
import Nullable from "~/types/Nullable"
import _ from "lodash"
import PlayerGameModel from "../game/PlayerGameModel"

export default class TileModel {
	constructor(playerGame: PlayerGameModel, props: Nullable<TileModel>) {
		this.playerGame = playerGame

		this.x = props.x
		this.y = props.y
		this.walkable = !(props.walkable == false)

		this.playerGame.disposable.push(
			reaction(
				() => this.walkable,
				() => {
					this.playerGame.grid.setWalkableAt(this.x, this.y, this.walkable)
					this.playerGame.enemies.forEach(x => x.findPath())
				}
			)
		)
	}
	playerGame: PlayerGameModel

	x = 0
	y = 0
	@observable walkable = true
}