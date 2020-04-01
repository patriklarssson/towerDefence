import Store from "./Store";
import { when, observable, action } from "mobx";


export enum TeachStep {
	play,
	nextWave,
	shop,
	upgrade
}


export default class TeachStore {
	constructor(store: Store) {

		when(
			() => store.playerGame != undefined,
			() => {
				// this.currentStep = TeachStep.play
				// store.currentGame.playerGames.forEach(x => x.setPause(true))
			}
		)
	}

	@observable currentStep: TeachStep = undefined

	@action nextStep = () => {

	}

}

