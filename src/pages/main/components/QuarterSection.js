import React, {useContext, useState} from 'react';

import WeekSection from "./WeekSection";

import styles from './QuarterSection.module.css'
import QuarterCube from "./QuarterCube";
import PopUpModal from "./PopUpModal";
import {useHttpClient} from "../../../shared/hooks/http-hook";
import {AuthContext} from "../../../shared/context/auth-context";

const QuarterSection = (props) => {
    const { quarter, endDate, color, jid } = props.quarter

    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    // console.log('week section',color)
    const auth = useContext(AuthContext)
    const [journal, setJournal] = useState('')

    const [infoDetailStatus, setInfoDetailStatus] = useState(false)

    const cubeClickHandler = async() => {
        if (jid !== 0) {
            try {
                const responseData = await sendRequest('content/getJournalById', 'POST',
                    JSON.stringify({
                        jid: jid
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                setJournal(responseData.journal.journal)
                console.log(responseData.journal.journal)
                setInfoDetailStatus(prevState => !prevState)
            } catch (e) {
                console.log(e)
                setTimeout(() => {
                    clearError()
                },5000)
            }
        } else {
            setInfoDetailStatus(prevState => !prevState)
        }
        console.log('cube clicked')
    }

    const handleClose = () => {
        setInfoDetailStatus(false)
    }

    return (
        <div className={styles.quarter}>
            <QuarterCube onCubeClick={cubeClickHandler} color={color} />
            <PopUpModal showModal={infoDetailStatus} onHandleClose={handleClose} year={props.year} info={props.quarter} journal={journal} mode={"quarter"} />
            {props.quarter.weeks && props.quarter.weeks.length > 0 && props.quarter.weeks.map((week, index) => {
                return (
                    <WeekSection key={index} weekInfo={week}/>
                )
            })}
        </div>
    );
};

export default QuarterSection;
