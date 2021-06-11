import React from 'react'
import styles from './Card.module.css'
const Card = (props) => {  
    
    let clasess = `${styles.card} ` + props.className

    return (
        <div className={clasess}>{props.children}</div>
    )
}

export default Card
