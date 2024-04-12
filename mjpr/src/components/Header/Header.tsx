import { BurgerMenu } from './BurgerMenu'
import { ReturnButton } from './ReturnButton'

export function Header() {
    return (
        <header className="flex justify-between px-4 mt-4">
            <ReturnButton />
            <BurgerMenu />
        </header>
    )
}
