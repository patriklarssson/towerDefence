import PlayerGameModel from "../game/PlayerGameModel";
import BaseModel from "../BaseModel";
import { velToPos } from "~/utils/goToPos";
import _ from "lodash";
import { computed } from "mobx";

export interface ProjectileProps {
	pxX: number
	pxY: number
	damage: number

	radius?: number
	target?: {
		id: any
		pxX: number
		pxY: number
	}
}

export default class ProjectileModel extends BaseModel {
	constructor(playerGame: PlayerGameModel, props: ProjectileProps) {
		super()
		if (new.target === ProjectileModel) {
			throw new TypeError("Cannot construct Abstract instances directly");
		}


		this.playerGame = playerGame
		this.pxX = this.pxX_previous = props.pxX
		this.pxY = this.pxY_previous = props.pxY
		this.damage = props.damage
		this.radius = props.radius

		if (props.target) {
			this.target = { pxX: props.target.pxX, pxY: props.target.pxY, id: props.target.id }
			this.updateTarget(props.target.pxX, props.target.pxY)
		}
	}
	playerGame: PlayerGameModel

	target: { pxX, pxY, id } = undefined

	updateTarget = (pxX, pxY) => {
		this.target.pxX = pxX
		this.target.pxY = pxY
		const distX = Math.abs(this.pxX - this.target.pxX)
		const distY = Math.abs(this.pxY - this.target.pxY)
		const max = _.max([distX, distY])

		this.velocityX = (distX / max) * this.velocity
		this.velocityY = (distY / max) * this.velocity

		this.updateX = velToPos(this.pxX, this.target.pxX)
		this.updateY = velToPos(this.pxY, this.target.pxY)
	}

	pxX_previous = 0
	pxY_previous = 0
	pxX = 0
	pxY = 0
	radius = 0

	damage = 1

	velocity = 1
	velocityX = undefined
	velocityY = undefined

	@computed get computedVelocity() {
		return this.playerGame.tileSize * this.velocity
	}

	updateX
	updateY
	updatePosition = (delta: number) => {
		const velocity = (delta / 1000) * this.computedVelocity

		this.pxX_previous = this.pxX
		this.pxY_previous = this.pxY
		this.pxX = this.updateX(this.pxX, velocity * this.velocityX)
		this.pxY = this.updateY(this.pxY, velocity * this.velocityY)

		if ((this.pxX > this.playerGame.widthPx || this.pxX < 0 || this.pxY > this.playerGame.heightPx || this.pxY < 0))
			this.playerGame.projectiles.splice(this.playerGame.projectiles.indexOf(this), 1)
	}

	collisionEnemy = (delta: number) => {
		const projectilePosX = { start: _.min([this.pxX - this.radius, this.pxX_previous - this.radius]), stop: _.max([this.pxX + this.radius, this.pxX_previous + this.radius]) }
		const projectilePosY = { start: _.min([this.pxY - this.radius, this.pxY_previous - this.radius]), stop: _.max([this.pxY + this.radius, this.pxY_previous + this.radius]) }

		const enemy = this.playerGame.enemies.find(x => intersect(projectilePosX, { start: x.pxX - x.radius, stop: x.pxX + x.radius }) && intersect(projectilePosY, { start: x.pxY - x.radius, stop: x.pxY + x.radius }))

		if (enemy) {
			enemy.onHit(this)
			this.playerGame.projectiles.splice(this.playerGame.projectiles.indexOf(this), 1)
			return true
		}
		return false
	}

	enemiesHit = []
	collisionEnemies = (delta: number) => {
		const projectilePosX = { start: _.min([this.pxX - this.radius, this.pxX_previous - this.radius]), stop: _.max([this.pxX + this.radius, this.pxX_previous + this.radius]) }
		const projectilePosY = { start: _.min([this.pxY - this.radius, this.pxY_previous - this.radius]), stop: _.max([this.pxY + this.radius, this.pxY_previous + this.radius]) }
		const enemies = this.playerGame.enemies.filter(x => !this.enemiesHit.includes(x.id) && intersect(projectilePosX, { start: x.pxX - x.radius, stop: x.pxX + x.radius }) && intersect(projectilePosY, { start: x.pxY - x.radius, stop: x.pxY + x.radius }))

		enemies.forEach(x => x.onHit(this))
		this.enemiesHit = this.enemiesHit.concat(enemies.map(x => x.id))
	}

	update = (delta: number) => {
		// override this
	}
	draw = (ctx: CanvasRenderingContext2D) => {
		// override this
	}
}

type m = { start, stop }
const intersect = (a: m, b: m) => {
	return a.start < b.stop && a.stop > b.start
}