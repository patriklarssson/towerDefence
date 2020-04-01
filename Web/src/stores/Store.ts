import { action, observable, computed } from "mobx";
import withKeyStore from "./withKeyStore";
import TeachStore from "./TeachStore";
import PlayerGameModel from "~/models/game/PlayerGameModel";

export default class Store {
	constructor() {
		this.teachStore = new TeachStore(this)
	}
	teachStore: TeachStore

	@observable tileSize = 64 * .75

	keysDown = observable.array<string>()

	@observable playerGame: PlayerGameModel



	@action createGame = () => {

		if (this.playerGame) {
			this.playerGame.dispose()

		}
		this.playerGame = new PlayerGameModel(this, { tileSize: this.tileSize })
		this.playerGame.start()
	}
}

let store = undefined
export const createStore = () => {
	if (!store) {
		store = new Store()
		withKeyStore(store)
	}
	return store
}
