import { observable, computed, action } from "mobx";
import _ from "lodash";
import PlayerGameModel from "../game/PlayerGameModel";

type AttributeType = (attribute: TurretAttribute) => number
export default class TurretAttribute {
	constructor(playerGame: PlayerGameModel, props: { valueFn: AttributeType, priceFn: AttributeType, level?: number, maxLevel: number }) {
		this.playerGame = playerGame
		this.valueFn = props.valueFn
		this.priceFn = props.priceFn
		this.maxLevel = props.maxLevel
		if (props.level != undefined)
			this.level = props.level
	}
	playerGame: PlayerGameModel

	private valueFn
	private priceFn

	@observable level: number = 0
	@observable maxLevel: number = 0
	@observable totalPriceValue: number = 0

	@computed get value() { return this.valueFn({ level: this.level }) }
	@computed get price() { return this.priceFn({ level: this.level }) }

	@computed get next() {
		return new TurretAttribute(this.playerGame, { level: this.level + 1, priceFn: this.priceFn, valueFn: this.valueFn, maxLevel: this.maxLevel })
	}
	@computed get nextUpgrades() {
		if (this.level >= this.maxLevel)
			return []
		const arr: TurretAttribute[] = [this.next]
		for (let index = this.level + 1; index < _.min([this.level + 2, this.maxLevel]); index++) {
			arr.push(_.last(arr).next)
		}
		return arr
	}

	@action upgrade = () => {
		if (this.playerGame.shop.selectedTurret && this.playerGame.shop.tryBuy(this.next.price)) {
			this.totalPriceValue += this.next.price
			this.level++
		}

	}

}