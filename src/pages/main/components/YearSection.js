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
            <div className={styles.yearTextHidden} onClick={handleYearModal}>{props.quarters.currentYear}</div>
            <QuarterSection key={1} weeks={props.quarters.quarters[0].weeks}/>
            <QuarterSection key={2} weeks={props.quarters.quarters[1].weeks}/>
            <QuarterSection key={3} weeks={props.quarters.quarters[2].weeks}/>
            <QuarterSection key={4} weeks={props.quarters.quarters[3].weeks}/>
        </div>
    );
};

export default YearSection;
