import React, { useEffect, useRef, useContext } from "react"
import { makeStyles } from "@material-ui/styles"
import domtoimage from 'dom-to-image';
import _ from "lodash";
import { CustomTheme } from "..";
import BasicTile from "~/graphics/BasicTile";



const useStyles = makeStyles((theme: CustomTheme) => ({
    container: {
        height: "100%",
        width: "100%",
    },


    standardTurret: {
        height: theme.custom.tileSize / 2,
        width: theme.custom.tileSize / 2,
        borderRadius: 100,
        backgroundColor: "#bf00d8"
    },
    triTurret: {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: " 0 16px 32px 16px",
        borderColor: "transparent transparent #007bff transparent",
    },
    normalEnemy: {
        height: theme.custom.tileSize / 2,
        width: theme.custom.tileSize / 2,
        borderRadius: 100,
        backgroundColor: "#baa0d8"
    },

    tile: {
        height: theme.custom.tileSize,
        width: theme.custom.tileSize,
        backgroundImage: BasicTile.backgroundImage
    }
}))

class SpritType {
    standardTurret: any
    triTurret: any
    tile: any
    normalEnemy: any
}

const useLocalSprites = (): SpritType => {
    const classes = useStyles()
    return {
        standardTurret: ({ r }) => <div ref={r} className={classes.standardTurret}></div>,
        triTurret: ({ r }) => <div ref={r} className={classes.triTurret}></div>,
        tile: ({ r }) => <div ref={r} className={classes.tile}></div>,
        normalEnemy: ({ r }) => <div ref={r} className={classes.normalEnemy}></div>,
    }
}



const Sprites = ({ loaded }) => {
    const spriteComponents = useLocalSprites()


    const items = Object.entries(spriteComponents).map(([key, value]) => {
        return {
            name: key,
            ref: useRef(null),
            comp: value
        }
    })

    useEffect(() => {
        const prom = items.map((x) => domtoimage.toPng(x.ref.current).then(z => ({ [x.name]: z })))

        Promise.all(prom).then(x => {
            loaded(Object.assign({}, ...x))
        })
    })


    return (
        <div>
            {items.map((x) => {
                const Comp = x.comp
                return <Comp key={x.name} r={x.ref} />
            })}
        </div>
    )
}

export default Sprites


export const useSprites = () => {
    return useContext(SpriteContext)
}



export const SpriteContext = React.createContext(new SpritType())
// {
//     turret: undefined,
//     turret2: undefined
// })