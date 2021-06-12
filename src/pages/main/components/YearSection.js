import React, {useContext, useEffect, useState} from 'react';

import QuarterSection from "./QuarterSection";
import QuarterCube from "./QuarterCube";

import styles from './YearSection.module.css'
import PopUpModal from "./PopUpModal";
import {useHttpClient} from "../../../shared/hooks/http-hook";
import {AuthContext} from "../../../shared/context/auth-context";

const YearSection = (props) => {
    const [showYearModal, setShowYearModal] = useState(false)
    const [journal, setJournal] = useState('')

    const { color, jid } = props.year
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const auth = useContext(AuthContext)

    const handleYearModal = async() => {
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
                setShowYearModal(prevState => !prevState)
            } catch (e) {
                console.log(e)
                setTimeout(() => {
                    clearError()
                },5000)
            }
        } else {
            setShowYearModal(prevState => !prevState)
        }
        console.log('cube clicked')
    }

    const handleClose = () => {
        setShowYearModal(false)
    }

    return (
        <div className={styles.quarterWrapper} >
            <div className={styles.yearTextHidden} style={{backgroundColor: `${color}`}} onClick={handleYearModal}>{props.year.currentYear}</div>
            <QuarterSection key={1} quarter={props.year.quarters[0]} year={props.year.currentYear}/>
            <QuarterSection key={2} quarter={props.year.quarters[1]} year={props.year.currentYear}/>
            <QuarterSection key={3} quarter={props.year.quarters[2]} year={props.year.currentYear}/>
            <QuarterSection key={4} quarter={props.year.quarters[3]} year={props.year.currentYear}/>
            <PopUpModal showModal={showYearModal} onHandleClose={handleClose} info={props.year} journal={journal} mode={"year"} />
        </div>
    );
};

export default YearSection;
