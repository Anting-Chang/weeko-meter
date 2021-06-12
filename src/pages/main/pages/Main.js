import React, {useContext, useEffect, useState} from 'react';

import { createWeek, addJournalToCreatedWeek } from "../../../shared/util/create-week";


import YearSection from "../components/YearSection";
import Spinner from 'react-bootstrap/Spinner'

import styles from './Main.module.css'
import {AuthContext} from "../../../shared/context/auth-context";
import {useHttpClient} from "../../../shared/hooks/http-hook";
import {useSelector} from "react-redux";
import {selectColor} from "../../../shared/store/slice/colorSlice";

// const colorMap = [
//     "#d8f3dc",
//     "#74c69d",
//     "#40916c",
//     "#1b4332"
// ]

const Main = () => {
    const [weekObj, setWeekObj] = useState(null)
    const [yearVisibilityStatus, setYearVisibilityStatus] = useState('yearWrapperHide')
    const [ifRendering, setIfRendering] = useState(false)

    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const colorMap = useSelector(selectColor)

    const getWeekObj = () => {
        console.log('get week obj button pressed')
    }

    useEffect(() => {
        const sendWeekObjReq = async() => {
            try {
                const responseData = await sendRequest('users/getWeekObj', 'POST',
                    JSON.stringify({}),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                const { expectedYears, birthday } = responseData.weekObj
                console.log(responseData.weekObj)
                const createdWeekObj = createWeek(expectedYears,new Date(birthday))
                const loadedWeekObj = addJournalToCreatedWeek(createdWeekObj,responseData.weekObj, colorMap)
                console.log('loaded week obj',loadedWeekObj)
                setIfRendering(true)
                setTimeout(() => {
                    setWeekObj(loadedWeekObj)
                }, 1000)
            } catch (e) {}
        }
        sendWeekObjReq()
    },[])

    useEffect(() => {
        console.log('loaded')
        setIfRendering(false)
        if (weekObj) {
            setYearVisibilityStatus('yearWrapperShow')
        }
    }, [weekObj])



    return (
        <div>
            <div className={styles.loading}>
                {ifRendering &&
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
            </div>
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
