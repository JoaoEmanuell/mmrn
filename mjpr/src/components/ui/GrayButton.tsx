import { ButtonHTMLAttributes } from 'react'

interface GrayButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
    customClassName?: string
}

export function GrayButton(props: GrayButtonInterface) {
    return (
        <button
            className={`bg-gray-300 text-bold p-2 rounded text-black ${props.customClassName}`}
            {...props}
        >
            {props.text}
        </button>
    )
}
