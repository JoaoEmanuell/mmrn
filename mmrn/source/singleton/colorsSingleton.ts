import { getColors } from '../darkMode/colors'
import { SingletonInterface } from '../interfaces/singletonInterface'

export class ColorsSingleton implements SingletonInterface {
    instance: undefined | any = undefined

    async getInstance() {
        if (this.instance === undefined) {
            console.log('undefined instance')
            this.instance = await getColors()
        }
        return this.instance
    }

    async updateInstance() {
        console.log('update instance')

        this.instance = await getColors()
    }
}
