import TurretModel, { TurretProps } from "./TurretModel"
import PlayerGameModel from "../game/PlayerGameModel"
import _ from "lodash"
import EnemyModel from "../enemies/EnemyModel"
import SniperTurret from "../../graphics/SniperTurret.png"
import TurretAttribute from "./TurretAttribute";
import SmallLaserProjectileModel from "../projectiles/SmallLaserProjectileModel";

const damage = [
	{ price: 0, value: 5 },
	{ price: 1100, value: 10 },
	{ price: 2200, value: 30 },
	{ price: 10700, value: 140 },
]

const range = [
	{ price: 0, value: 20 },
	// { price: 120, value: 2 },
	// { price: 420, value: 3 },
]
const rateOfFire = [
	{ price: 0, value: 3000 },
	{ price: 2440, value: 2000 },
	{ price: 6100, value: 1000 },
]


const img = new Image()
img.src = SniperTurret

export default class SniperTurretModel extends TurretModel {
	constructor(playerGame: PlayerGameModel, props: TurretProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .7, name: "Sniper", price: 100 })

		this.attributes = {
			damage: new TurretAttribute(playerGame, { priceFn: (a) => damage[a.level].price, valueFn: (a) => damage[a.level].value, maxLevel: damage.length - 1 }),
			range: new TurretAttribute(playerGame, { priceFn: (a) => range[a.level].price, valueFn: (a) => range[a.level].value, maxLevel: range.length - 1 }),
			rateOfFire: new TurretAttribute(playerGame, { priceFn: (a) => rateOfFire[a.level].price, valueFn: (a) => rateOfFire[a.level].value, maxLevel: rateOfFire.length - 1 }),
		}
	}

	clone = () => new SniperTurretModel(this.playerGame, this)

	update = (delta: number) => {
		if (this.enemiesInRange.length > 0) {
			this.targetPos = {
				pxX: this.enemiesInRange[0].pxX,
				pxY: this.enemiesInRange[0].pxY,
			}
		}
		this.fire(delta)
	}

	targetPos = { pxX: 0, pxY: 0 }

	onFire = (enemy: EnemyModel) => {
		this.playerGame.projectiles.push(new SmallLaserProjectileModel(this.playerGame, { pxX: this.pxX, pxY: this.pxY, target: enemy, damage: this.attributes.damage.value }))
	}

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.save()
		ctx.translate(this.pxX, this.pxY)
		const angle = Math.atan2(this.targetPos.pxY - this.pxY, this.targetPos.pxX - this.pxX) + (90 * Math.PI / 180)
		ctx.rotate(angle)

		ctx.drawImage(img, -this.radius, -this.radius, this.radius * 2, this.radius * 2)

		ctx.restore()

		this._draw(ctx)
	}
}
