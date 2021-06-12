import React, {useEffect, useState} from 'react';

import styles from './ColorChoosingButton.module.css'

const ColorChoosingButton = (props) => {
    const colorMap = [
        "#d8f3dc",
        "#74c69d",
        "#40916c",
        "#1b4332"
    ]
    const [active, setActive] = useState(colorMap[3])
    const [numBtn, setNumBtn] = useState(3)

    useEffect(() => {
        props.onChooseColor(3)
    }, [])

    const changeActive = (value) => {
        setActive(colorMap[value])
        setNumBtn(value)
        props.onChooseColor(value)
    }

    return (
        <div className={styles.btnWrapper}>
            <div onClick={() => changeActive(0)} className={styles.btnBase} style={{backgroundColor: numBtn === 0 ? `${active}` : ''}}>{colorMap[0]}</div>
            <div onClick={() => changeActive(1)} className={styles.btnBase} style={{backgroundColor: numBtn === 1 ? `${active}` : ''}}>{colorMap[1]}</div>
            <div onClick={() => changeActive(2)} className={styles.btnBase} style={{backgroundColor: numBtn === 2 ? `${active}` : ''}}>{colorMap[2]}</div>
            <div onClick={() => changeActive(3)} className={styles.btnBase} style={{backgroundColor: numBtn === 3 ? `${active}` : ''}}>{colorMap[3]}</div>
        </div>
    );
};

export default ColorChoosingButton;
