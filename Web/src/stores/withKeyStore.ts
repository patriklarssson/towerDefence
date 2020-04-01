import Store from "./Store";
import hotkeys from "hotkeys-js";
import moment from "moment";

let lastClicked = moment()

export default (store: Store) => {
	document.onkeydown = (e) => {
		if (!store.keysDown.includes(e.key))
			store.keysDown.push(e.key)
	}
	document.onkeyup = (e) => {
		store.keysDown.remove(e.key)
	}

	hotkeys("esc", () => {
		if (store.playerGame && store.playerGame) {
			store.playerGame.unselect()
		}
	})
	hotkeys("1,2,3", (e, handler) => {
		if (store.playerGame) {
			switch (handler.key) {
				case "1":
					store.playerGame.shop.selectTurretFromShop("cannon")
					break;

				case "2":
					store.playerGame.shop.selectTurretFromShop("rocket")
					break;

				case "3":
					store.playerGame.shop.selectTurretFromShop("surge")
					break;

				case "4":
					store.playerGame.shop.selectTurretFromShop("sniper")
					break;

				default:
					break;
			}

		}

	})

	hotkeys("space", () => {
		if(moment().diff(lastClicked, "milliseconds") > 500){
			store.playerGame.sendNextWave()
			lastClicked = moment()
		}
	})

	window.onblur = () => {
		if (store.playerGame) {
			store.playerGame.setPause(true)
		}
	}
	window.onfocus = () => {
		if (store.playerGame) {
			store.playerGame.setPause(false)
		}
	}
}
