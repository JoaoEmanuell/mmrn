import { getColors } from '../darkMode/colors'
import { SingletonInterface } from '../interfaces/singletonInterface'

export class ColorsSingleton implements SingletonInterface {
    instance: undefined | any = undefined

    async getInstance() {
        if (this.instance === undefined) {
            this.instance = await getColors()
        }
        return this.instance
    }

    async updateInstance() {
        this.instance = await getColors()
    }
}
