import React from 'react'
import moment, { Moment } from 'moment'
import styles from './Button.module.css'
// import { getClimate } from '../lib/api'
import { Climate } from '../lib/types'
import { Anchor, Header, Nav, Text } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarBattery, faPlug, faSolarPanel, faThermometerEmpty } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface ButtonProps {
    icon?: IconProp,
    label?: string,
    selected?: boolean
}


const Button = ({ icon, label, selected }: ButtonProps) => {
    const iconElement = icon ? <FontAwesomeIcon size="2x" icon={icon} /> : <></>
    const labelElement = label ? <span>{label}</span> : <></>


    return (
        <button className={ selected ? styles.selected : ""}>
            {iconElement}
            {labelElement}
        </button>
    )
}

export default Button