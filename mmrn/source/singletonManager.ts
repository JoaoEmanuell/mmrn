import { ColorsSingleton } from './singleton/colorsSingleton'

const colorsSingleton = new ColorsSingleton()
colorsSingleton.getInstance().then()
export { colorsSingleton }
