import { makeStyles } from "@material-ui/styles"
import { CustomTheme } from "~/index"
import _ from "lodash"
import CannonTurret from "../../graphics/CannonTurret.png"
import RocketTurret from "../../graphics/RocketTurret.png"
import SurgeTurret from "../../graphics/SurgeTurret.png"
import SniperTurret from "../../graphics/SniperTurret.png"

export default makeStyles((theme: CustomTheme) => {
	const turret = {
		height: theme.custom.tileSize - 1,
		width: theme.custom.tileSize - 1,
		backgroundSize: theme.custom.tileSize - 1,
		backgroundRepeat: "no-repeat",
		cursor: "pointer",
	}

	return {
		container: {
			display: "flex",
			flexWrap: "wrap"
		},
		CannonTurret: {
			...turret,
			backgroundImage: `url(${CannonTurret})`,
		},
		RocketTurret: {
			...turret,
			backgroundImage: `url(${RocketTurret})`,
		},
		SurgeTurret: {
			...turret,
			backgroundImage: `url(${SurgeTurret})`,
		},
		SniperTurret: {
			...turret,
			backgroundImage: `url(${SniperTurret})`,
		},
	}

})