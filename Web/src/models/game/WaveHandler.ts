import PlayerGameModel from "../game/PlayerGameModel";
import { observable, computed } from "mobx";
import WaveModel from "./WaveModel";
import _ from "lodash";
import NormalEnemyModel from "../enemies/NormalEnemyModel";
import SlowEnemyModel from "../enemies/SlowEnemyModel";
import FastEnemyModel from "../enemies/FastEnemyModel";

export default class WaveHandler {
	constructor(playerGame: PlayerGameModel) {
		this.playerGame = playerGame
	}
	playerGame: PlayerGameModel

	@observable wave = 0

	interval = 20 * 1000
	@observable currentIntervalRemaining = 10 * 1000
	@computed get currentIntervalRemainingPercent() { return _.round(this.currentIntervalRemaining / this.interval, 2) }

	lastEnemyType = 0
	update = (delta: number) => {
		this.currentIntervalRemaining -= delta
		if (this.currentIntervalRemaining <= 0) {
			this.currentIntervalRemaining = this.interval - Math.abs(this.currentIntervalRemaining)
			this.wave += 1
			this.playerGame.waves.push(new WaveModel(this.playerGame, { wave: this.wave, enemies: _.times(10, () => new EnemyTypes[this.lastEnemyType](this.playerGame, { cashValue: this.wave, health: this.wave })) }))

			if (this.lastEnemyType < (EnemyTypes.length - 1))
				this.lastEnemyType++
			else
				this.lastEnemyType = 0
		}

	}
}

const EnemyTypes = [NormalEnemyModel, FastEnemyModel, SlowEnemyModel]

