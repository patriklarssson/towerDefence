import TurretModel, { TurretProps } from "./TurretModel"
import PlayerGameModel from "../game/PlayerGameModel"
import _ from "lodash"
import EnemyModel from "../enemies/EnemyModel"
import SurgeTurret from "../../graphics/SurgeTurret.png"
import SurgeProjectileModel from "../projectiles/SurgeProjectileModel";
import TurretAttribute from "./TurretAttribute";
import { colors } from "@material-ui/core";

const damage = [
	{ price: 0, value: 1 },
	{ price: 90, value: 2 },
	{ price: 440, value: 4 },
	{ price: 980, value: 9 },
	{ price: 3400, value: 16 },
	{ price: 8900, value: 26 },
]

const range = [
	{ price: 0, value: 1 },
	{ price: 120, value: 1.5 },
	{ price: 420, value: 2 },
]
const rateOfFire = [
	{ price: 0, value: 2000 },
	{ price: 240, value: 1500 },
	{ price: 7600, value: 900 },
]


const img = new Image()
img.src = SurgeTurret

export default class SurgeTurretModel extends TurretModel {
	constructor(playerGame: PlayerGameModel, props: TurretProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .7, name: "Surge", price: 100 })

		this.attributes = {
			damage: new TurretAttribute(playerGame, { priceFn: (a) => damage[a.level].price, valueFn: (a) => damage[a.level].value, maxLevel: damage.length - 1 }),
			range: new TurretAttribute(playerGame, { priceFn: (a) => range[a.level].price, valueFn: (a) => range[a.level].value, maxLevel: range.length - 1 }),
			rateOfFire: new TurretAttribute(playerGame, { priceFn: (a) => rateOfFire[a.level].price, valueFn: (a) => rateOfFire[a.level].value, maxLevel: rateOfFire.length - 1 }),
		}
	}
	clone = () => new SurgeTurretModel(this.playerGame, this)

	update = (delta: number) => {
		this.fire(delta)
		this.rotation += delta / 1000
	}
	rotation = 0



	onFire = (enemy: EnemyModel) => {
		this.playerGame.projectiles.push(new SurgeProjectileModel(this.playerGame, { pxX: this.pxX, pxY: this.pxY, target: enemy, damage: this.attributes.damage.value, maxRadius: this.attributes.range.value, color: colors.green[100] }))
	}

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.save()
		ctx.translate(this.pxX, this.pxY)
		ctx.rotate(this.rotation)
		ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2)

		ctx.restore()
		this._draw(ctx)
	}
}
