'use client'

import { CircleX } from 'lucide-react'
import {
    LabelHTMLAttributes,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react'

interface DropdownProps {
    labelText?: string
    labelProps?: LabelHTMLAttributes<any>
    dropdownItems: any /* {
        name: string
        id: number
    }*/
    onSelect: (selectedValue: string) => void
}

export function Dropdown(props: DropdownProps) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [elements, setElements] = useState<any[]>([])
    const [floatMenu, setFloatMenu] = useState<JSX.Element | null>()
    const [initialDropdownItems, setInitialDropdownItems] = useState<any[]>([])
    const [initialDropdownItemsString, setInitialDropdownItemsString] =
        useState<string | null>()
    const [firstOpenMenu, setFirstOpenMenu] = useState(true)
    const [closeDiv, setCloseDiv] = useState<JSX.Element | null>()
    const [elementsZIndex, setElementsZIndex] = useState('z-0')

    const onChangeInput = () => {
        // search the itens
        const value = inputRef.current!.value.toLocaleLowerCase()
        const elementsWithValue: SetStateAction<any[]> = []
        elements.forEach((item: [string, number]) => {
            const name = item[0]
            const valueItem = item[1]
            if (name.toLowerCase().indexOf(value) !== -1) {
                elementsWithValue.push([name, valueItem])
            }
        })
        setElements(elementsWithValue)
    }

    const toggleMenu = () => {
        // enable menu
        setIsOpen(true)
        getFloatMenu()
        setCloseDiv(
            <div
                className="inset-0 z-10 w-[100%] absolute"
                onClick={closeMenu}
            ></div>
        )
        setElementsZIndex('z-20 relative')
    }

    const getFloatMenu = () => {
        // render the float menu
        const mainUlClassName = `border border-gray-400 rounded-lg mt-2 mb-4 p-2 ${elementsZIndex}`
        const liClassName = `transition duration-700 ease-in-out hover:duration-150 hover:scale-110 p-2 ${elementsZIndex}`

        const getMenuWithCustomMapVar = (customMapVar: any[]) => {
            // use a custom map var to avoid repeat code
            return (
                <ul className={mainUlClassName}>
                    {customMapVar.map((item: [string, number]) => {
                        const name = item[0]
                        const value = item[1]
                        return (
                            <li
                                key={value}
                                onClick={() => {
                                    props.onSelect(value.toString())
                                    setIsOpen(false)
                                }}
                                className={liClassName}
                            >
                                {name}
                            </li>
                        )
                    })}
                </ul>
            )
        }

        if (firstOpenMenu) {
            // first open menu
            setFloatMenu(getMenuWithCustomMapVar(initialDropdownItems))
            setFirstOpenMenu(false)
        } else if (
            elements.length === 0 &&
            inputRef.current!.value.trim() !== ''
        ) {
            if (
                initialDropdownItemsString?.indexOf(
                    inputRef.current!.value.trim()
                ) !== -1
            ) {
                // char exist in items
                // anti-bug
            } else {
                resetElements()
                setFloatMenu(
                    <ul className={mainUlClassName}>
                        <li className={liClassName}>Louvor não encontrado</li>
                    </ul>
                )
            }
        } else {
            setFloatMenu(getMenuWithCustomMapVar(elements))
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // reset elements or close menu
        resetElements()
        if (event.key === 'Escape') {
            closeMenu()
        }
    }

    const onFocus = () => {
        // open menu if is closed
        if (!isOpen) {
            setIsOpen(true)
        }
    }

    const closeMenu = () => {
        // close menu, reset elements and reset input
        setIsOpen(false)
        resetElements()
        inputRef.current!.value = ''
        setFirstOpenMenu(true)
        setElementsZIndex('z-0') // reset zIndex
        setCloseDiv(<div></div>) // reset close div
    }

    const resetElements = () => {
        // reset the elements for initial
        setElements([...initialDropdownItems])
    }

    useEffect(() => {
        setInitialDropdownItems(Object.entries(props.dropdownItems))
        setInitialDropdownItemsString(
            Object.entries(props.dropdownItems).toString() // convert to string, used to verify if char exists in items, for avoid bug
        )
        resetElements()
    }, [props.dropdownItems])

    return (
        <div>
            {closeDiv}
            <div className={elementsZIndex}>
                <label htmlFor="dropdown" {...props.labelProps}>
                    {props.labelText}
                </label>
                <br />
                <div
                    className={`flex p-2 text-black bg-white border border-gray-500 rounded-lg justify-between ${elementsZIndex}`}
                >
                    <input
                        type="text"
                        name="dropdown"
                        id="dropdown"
                        ref={inputRef}
                        onSelect={toggleMenu}
                        onChange={() => {
                            resetElements(), onChangeInput()
                        }}
                        onFocus={onFocus}
                        onKeyDown={onKeyDown}
                        className="outline-none"
                        autoComplete="off"
                        placeholder="Digite o nome do louvor"
                    />
                    <CircleX onClick={closeMenu} color="#000" />
                </div>
                {isOpen && floatMenu}
            </div>
        </div>
    )
}
