import _ from "lodash"
import { observable, action, reaction } from "mobx";
import PlayerGameModel from "./PlayerGameModel";
import TurretModel from "../turrets/TurretModel";
import CannonTurretModel from "../turrets/CannonTurretModel";
import RocketTurretModel from "../turrets/RocketTurretModel";
import SurgeTurretModel from "../turrets/SurgeTurretModel";
import TileModel from "../tiles/TileModel";
import SniperTurretModel from "../turrets/SniperTurretModel";


export default class ShopModel {
	constructor(playerGame: PlayerGameModel) {
		this.playerGame = playerGame

		this.playerGame.disposable.push(
			reaction(
				() => ({ ...this.playerGame.currentHoverTile }),
				({ x, y }) => {
					if (this.turretToBuy) {
						this.turretToBuy.x = x
						this.turretToBuy.y = y
					}
				}
			)
		)
	}

	playerGame: PlayerGameModel

	@observable turretToBuy: TurretModel = undefined
	@observable selectedTurret: TurretModel = undefined

	draw = (ctx: CanvasRenderingContext2D) => {
		if (this.turretToBuy) {
			const tile = this.playerGame.tiles.get(`${this.turretToBuy.x}_${this.turretToBuy.y}`)
			if (tile && tile.walkable)
				this.turretToBuy.draw(ctx)
		}
	}



	@action unselect = () => {
		this.turretToBuy = undefined
		this.selectedTurret = undefined
	}


	@action selectTurretFromShop = (variant: "cannon" | "rocket" | "surge" | "sniper") => {
		this.playerGame.unselect()

		const pos = { x: this.playerGame.currentHoverTile.x, y: this.playerGame.currentHoverTile.y }
		switch (variant) {

			case "cannon":
				this.turretToBuy = new CannonTurretModel(this.playerGame, pos)
				break

			case "rocket":
				this.turretToBuy = new RocketTurretModel(this.playerGame, pos)
				break

			case "surge":
				this.turretToBuy = new SurgeTurretModel(this.playerGame, pos)
				break

			case "sniper":
				this.turretToBuy = new SniperTurretModel(this.playerGame, pos)
				break
		}
	}


	@action onClickTile = (t: TileModel) => {
		if (this.turretToBuy && t.walkable) {
			if (this.tryBuy(this.turretToBuy.price)) {
				t.walkable = false

				const clone = this.turretToBuy.clone()
				this.playerGame.turrets.push(clone)

				if (!this.playerGame.store.keysDown.includes("Control")) {
					this.unselect()
					this.selectedTurret = clone

				}
			}
		} else if (!t.walkable) {
			const turret = this.playerGame.turrets.find(x => x.x == t.x && x.y == t.y)
			if (turret) {
				this.unselect()
				this.selectedTurret = turret
			}
		}
		else {
			this.unselect()
		}
	}

	@action tryBuy = (price: number) => {
		if (price <= this.playerGame.cash) {
			this.playerGame.cash -= price
			return true
		}
		return false
	}

	@action sellTurret = (t: TurretModel) => {
		const tile = this.playerGame.tiles.get(`${t.x}_${t.y}`)
		tile.walkable = true
		this.playerGame.cash += t.sellPriceValue
		this.playerGame.turrets.splice(this.playerGame.turrets.indexOf(t), 1)
		this.unselect()
	}
}