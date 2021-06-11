import React, {useEffect, useState} from 'react';

import { createWeek } from "../../../shared/util/create-week";

import YearSection from "../components/YearSection";

import styles from './Main.module.css'

const Main = () => {
    const [weekObj, setWeekObj] = useState(null)
    const [yearVisibilityStatus, setYearVisibilityStatus] = useState('yearWrapperHide')

    const getWeekObj = () => {
        setWeekObj(createWeek(100,new Date('August 19, 1997 00:00:00')))
        console.log(weekObj)
    }

    useEffect(() => {
        console.log('loaded')
        if (weekObj) {
            setYearVisibilityStatus('yearWrapperShow')
        }
    }, [weekObj])



    return (
        <div>
            Main page
            <div onClick={getWeekObj}>click</div>
            <div className={`${styles['yearWrapper']} ${styles[yearVisibilityStatus]}`}>
                {weekObj && weekObj.years.map((year, index) => {
                    return (
                        <YearSection key={index} year={year} />
                    )
                })}
            </div>

        </div>
    );
};

export default Main;
