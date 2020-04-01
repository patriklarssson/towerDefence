import PlayerGameModel from "../game/PlayerGameModel";
import PF from "pathfinding";
import goToPos, { goToNextPos } from "~/utils/goToPos";
import BaseModel from "../BaseModel";
import ProjectileModel from "../projectiles/ProjectileModel";
import _ from "lodash";

export interface EnemyProps {
	cashValue: number
	health: number
}


export default class EnemyModel extends BaseModel {
	constructor(playerGame: PlayerGameModel, props: EnemyProps & { radius: number, healthMultiplier: number }) {
		super()
		if (new.target === EnemyModel) {
			throw new TypeError("Cannot construct Abstract instances directly");
		}

		this.playerGame = playerGame
		this.playerGame = playerGame
		this.radius = props.radius
		this.cashValue = props.cashValue
		this.health = props.health * props.healthMultiplier
		this.pxX = playerGame.enterTile.x * playerGame.tileSize + (playerGame.tileSize / 2)
		this.center = this.playerGame.tileSize / 2
		this.findPath()
	}
	playerGame: PlayerGameModel

	health = 10
	cashValue = 0

	pxX = 0
	pxY = 0
	radius = 0
	velocity = 1 // in percent
	center = 0


	computedVelocity = _.memoize((vel) => {
		return this.playerGame.tileSize * vel
	})

	path = []
	pathPxX = _.memoize((index, path) => path.map(x => (x[0] * this.playerGame.tileSize) + this.center))
	pathPxY = _.memoize((index, path) => path.map(x => (x[1] * this.playerGame.tileSize) + this.center))


	findPath = () => {
		if (this.path.length <= 0)
			this.setPath(this.playerGame.enterTile.x, this.playerGame.enterTile.y)
		else {
			const [x, y] = this.path[0]
			if (this.playerGame.tiles.has(`${x}_${y}`)) {
				this.setPath(x, y)
			}
		}
	}

	setPath = (x, y) => {
		var grid = this.playerGame.grid.clone()
		var finder = new PF.AStarFinder()
		this.path = finder.findPath(x, y, this.playerGame.exitTile.x, this.playerGame.exitTile.y, grid)

		const [lastx, lasty] = _.last(this.path)
		this.path.push([lastx, lasty + 1])
	}


	update = (deltaFactor: number) => {
		if ((this.path.length <= 0)) {
			this.playerGame.enemyReachedEnd(this)
			return
		}

		const velocity = (deltaFactor / 1000) * this.computedVelocity(this.velocity)

		const posX = goToNextPos(this.pxX, this.pathPxX(this.path.length, this.path), velocity)
		const posY = goToNextPos(this.pxY, this.pathPxY(this.path.length, this.path), velocity)

		let reachedX = posX.posReached > 0
		let reachedY = posY.posReached > 0


		if (reachedX && reachedY) {
			const indexes = _.max([posX.posReached, posY.posReached])
			this.path.splice(0, indexes)
		}
		if (!reachedX)
			this.pxX = posX.pos
		if (!reachedY)
			this.pxY = posY.pos
	}


	onHit = (projectile: ProjectileModel) => {
		this.health -= projectile.damage
		if (this.health <= 0) {
			this.playerGame.enemies.splice(this.playerGame.enemies.indexOf(this), 1)
			this.playerGame.onKillEnemy(this)
		}
	}


	draw = (ctx: CanvasRenderingContext2D) => {
		// override
	}
}

