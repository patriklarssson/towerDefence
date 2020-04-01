import PlayerGameModel from "../game/PlayerGameModel";
import EnemyModel from "../enemies/EnemyModel";

export default class WaveModel {
	constructor(playerGame: PlayerGameModel, props: { wave: number, enemies: EnemyModel[] }) {
		this.playerGame = playerGame

		// this.wave = props.wave
		this.enemies = props.enemies.slice()
	}
	playerGame: PlayerGameModel

	// @observable wave = 0
	interval = 1 * 1000
	currentIntervalRemaining = 0 * 1000
	enemies: EnemyModel[] = []
	// observable.array<EnemyModel>()

	update = (delta: number) => {


		this.currentIntervalRemaining -= delta
		if (this.currentIntervalRemaining <= 0) {
			this.currentIntervalRemaining = this.interval - Math.abs(this.currentIntervalRemaining)

			if (this.enemies.length > 0) {
				this.playerGame.enemies.push(this.enemies.pop())
			}
			else {
				this.playerGame.waves.splice(this.playerGame.waves.indexOf(this), 1)
			}
		}
	}
}

