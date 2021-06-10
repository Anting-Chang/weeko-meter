import React from 'react';

import WeekSection from "./WeekSection";

import styles from './QuarterSection.module.css'
import QuarterCube from "./QuarterCube";

const QuarterSection = (props) => {
    return (
        <div className={styles.quarter}>
            <QuarterCube></QuarterCube>
            {props.weeks && props.weeks.length > 0 && props.weeks.map((week, index) => {
                return (
                    <WeekSection key={index} weekInfo={week}/>
                )
            })}
        </div>
    );
};

export default QuarterSection;
