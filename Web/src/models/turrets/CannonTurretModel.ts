import TurretModel, { TurretProps } from "./TurretModel"
import PlayerGameModel from "../game/PlayerGameModel"
import StraightProjectileModel from "../projectiles/StraightProjectileModel"
import _ from "lodash"
import EnemyModel from "../enemies/EnemyModel"
import CannonTurret from "../../graphics/CannonTurret.png"
import TurretAttribute from "./TurretAttribute";


const damage = [
	{ price: 0, value: 1 },
	{ price: 40, value: 2 },
	{ price: 210, value: 4 },
	{ price: 640, value: 9 },
	{ price: 2200, value: 16 },
	{ price: 3100, value: 21 },
]

const range = [
	{ price: 0, value: 1 },
	{ price: 120, value: 2 },
	{ price: 420, value: 3 },
]
const rateOfFire = [
	{ price: 0, value: 1000 },
	{ price: 240, value: 800 },
	{ price: 2600, value: 500 },
]



const img = new Image()
img.src = CannonTurret

export default class CannonTurretModel extends TurretModel {
	constructor(playerGame: PlayerGameModel, props: TurretProps) {
		super(playerGame, { ...props, radius: playerGame.tileSize * .7, name: "Cannon", price: 10 })

		this.attributes = {
			damage: new TurretAttribute(playerGame, { priceFn: (a) => damage[a.level].price, valueFn: (a) => damage[a.level].value, maxLevel: damage.length - 1 }),
			range: new TurretAttribute(playerGame, { priceFn: (a) => range[a.level].price, valueFn: (a) => range[a.level].value, maxLevel: range.length - 1 }),
			rateOfFire: new TurretAttribute(playerGame, { priceFn: (a) => rateOfFire[a.level].price, valueFn: (a) => rateOfFire[a.level].value, maxLevel: rateOfFire.length - 1 }),
		}
	}

	clone = () => new CannonTurretModel(this.playerGame, this)

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
		this.playerGame.projectiles.push(new StraightProjectileModel(this.playerGame, { pxX: this.pxX, pxY: this.pxY, target: enemy, damage: this.attributes.damage.value }))
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
