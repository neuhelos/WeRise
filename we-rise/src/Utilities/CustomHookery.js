import {useState} from 'react'


export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const clearinput = () => {
        setValue("")
    }

    return {value, onChange: handleChange, clearinput}
}

export const useSelect = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return {value, onChange: handleChange}
}
