import React, {useState} from 'react';

import WeekSection from "./WeekSection";

import styles from './QuarterSection.module.css'
import QuarterCube from "./QuarterCube";
import PopUpModal from "./PopUpModal";

const QuarterSection = (props) => {
    const [infoDetailStatus, setInfoDetailStatus] = useState(false)

    const cubeClickHandler = () => {
        console.log('cube clicked')
        setInfoDetailStatus(true)
    }

    const handleClose = () => {
        setInfoDetailStatus(false)
    }

    return (
        <div className={styles.quarter}>
            <QuarterCube onCubeClick={cubeClickHandler}></QuarterCube>
            <PopUpModal showModal={infoDetailStatus} onHandleClose={handleClose} year={props.year} info={props.quarter} mode={"quarter"} />

            {props.quarter.weeks && props.quarter.weeks.length > 0 && props.quarter.weeks.map((week, index) => {
                return (
                    <WeekSection key={index} weekInfo={week}/>
                )
            })}
        </div>
    );
};

export default QuarterSection;
