import React, {useEffect, useState} from 'react';

import QuarterSection from "./QuarterSection";
import QuarterCube from "./QuarterCube";

import styles from './YearSection.module.css'

const YearSection = (props) => {
    const [showYearModal, setShowYearModal] = useState(false)

    const handleYearModal = () => {
        setShowYearModal(true)
    }

    return (
        <div className={styles.quarterWrapper} >
            <div className={styles.yearTextHidden} onClick={handleYearModal}>{props.year.currentYear}</div>
            <QuarterSection key={1} quarter={props.year.quarters[0]} year={props.year.currentYear}/>
            <QuarterSection key={2} quarter={props.year.quarters[1]} year={props.year.currentYear}/>
            <QuarterSection key={3} quarter={props.year.quarters[2]} year={props.year.currentYear}/>
            <QuarterSection key={4} quarter={props.year.quarters[3]} year={props.year.currentYear}/>
        </div>
    );
};

export default YearSection;
