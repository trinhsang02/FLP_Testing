import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export const getPipeSizePosPair = (addToPosX = 0) => {
    let yPosTop = getRandom(220, windowHeight - 950)

    const pipeTop = { pos: { x: windowWidth + addToPosX, y: yPosTop }, size: { height: 450, width: 73 } }
    const pipeBottom = { pos: { x: windowWidth + addToPosX, y: (windowHeight - 200) + yPosTop }, size: { height: 450, width: 73 } }

    return { pipeTop, pipeBottom }

}