import { observable, computed, action, when, reaction, IReactionDisposer } from "mobx"
import _ from "lodash"
import WaveHandler from "./WaveHandler"
import TileModel from "../tiles/TileModel"
import EnemyModel from "../enemies/EnemyModel"
import TurretModel from "../turrets/TurretModel"
import ProjectileModel from "../projectiles/ProjectileModel"
import PF from "pathfinding"
import WaveModel from "./WaveModel"
import ShopModel from "./ShopModel";
import Store from "~/stores/Store";


export default class PlayerGameModel {
	constructor(game: Store, props: { tileSize: number }) {
		this.store = game


		this.tileSize = props.tileSize
		this.tileSizeHalf = props.tileSize / 2
		const tiles = _.flatten(_.times(this.height, y => {
			return _.times(this.width, x => new TileModel(this, { x, y }))
		}))
		this.tiles = new Map<string, TileModel>(tiles.map(t => ([`${t.x}_${t.y}`, t])) as any)

		this.disposable.push(
			when(
				() => this.lives <= 0,
				() => this.stop()
			)
		)
		this.disposable.push(
			reaction(
				() => this.paused,
				() => {
					if (this.paused)
						this.stop()
					else
						this.start()
				}
			)
		)
		this.shop = new ShopModel(this)
	}

	tileSize = 0
	tileSizeHalf = 0

	store: Store

	waveHandler = new WaveHandler(this)
	context: CanvasRenderingContext2D


	width = 10
	height = 10

	@observable cash = 50000
	@observable lives = 10
	@observable paused = false

	enterTile = { x: 5, y: 0 }
	exitTile = { x: 5, y: this.height - 1 }
	@observable currentHoverTile = { x: -1, y: -1 }




	@computed get widthPx() { return this.width * this.tileSize }
	@computed get heightPx() { return this.height * this.tileSize }
	grid = new PF.Grid(this.width, this.height)

	tiles = new Map<string, TileModel>()
	enemies: EnemyModel[] = []
	turrets: TurretModel[] = []
	projectiles: ProjectileModel[] = []
	waves: WaveModel[] = []

	shop: ShopModel


	disposable: IReactionDisposer[] = []
	dispose = () => {
		this.stop()
		this.disposable.forEach(disp => disp())
	}


	started = false
	start = () => {
		if (this.started)
			return
		this.started = true
		const stop = start(this.run)
		this.stop = () => {
			stop()
			this.started = false
		}
	}
	stop = () => { }

	run = (deltaFactor: number) => {
		if (!this.context)
			return
		this.update(deltaFactor)
		this.draw()
	}

	update = (deltaFactor: number) => {
		this.enemies.forEach(x => x.update(deltaFactor))
		this.turrets.forEach(x => x.update(deltaFactor))
		this.projectiles.forEach(x => x.update(deltaFactor))
		this.waveHandler.update(deltaFactor)
		this.waves.forEach(x => x.update(deltaFactor))
	}

	draw = () => {
		this.context.clearRect(0, 0, this.widthPx, this.heightPx)
		this.enemies.forEach(x => x.draw(this.context))
		this.turrets.forEach(x => x.draw(this.context))
		this.projectiles.forEach(x => x.draw(this.context))

		this.shop.draw(this.context)

	}





	@action enemyReachedEnd = (enemy: EnemyModel) => {
		this.lives -= 1
		this.enemies.splice(this.enemies.indexOf(enemy), 1)
	}

	@action onKillEnemy = (enemy: EnemyModel) => {
		this.cash += enemy.cashValue
	}




	@action hoverTile = (t: TileModel) => {
		this.currentHoverTile.x = t.x
		this.currentHoverTile.y = t.y
	}

	@action clickTile = (t: TileModel) => {
		this.shop.onClickTile(t)
	}

	@action unselect = () => {
		this.shop.unselect()
	}

	@action sendNextWave = () => this.waveHandler.currentIntervalRemaining = 0
	@action togglePause = () => {
		if (this.lives > 0) {
			this.paused = !this.paused
		}
	}
	@action setPause = (bool) => {
		if (this.lives > 0) {
			this.paused = bool
		}
	}
}

const timestamp = () => {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
}

const fpsTime = 1000 / 60

const start = (update) => {
	let frame = undefined

	let now, last = timestamp()
	let deltaFactor = 0
	const run = () => {
		frame = requestAnimationFrame(run)
		now = timestamp()

		if (now > (last + fpsTime)) {
			deltaFactor = (now - last)// / fpsTime
			last = now
			update(deltaFactor)
		}
	}
	frame = requestAnimationFrame(run)

	return () => {
		cancelAnimationFrame(frame)
		frame = undefined
	}
}