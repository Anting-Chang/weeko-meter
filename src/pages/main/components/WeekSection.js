import React, {useContext, useState} from 'react';

import styles from './WeekSection.module.css'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import {Link} from "react-router-dom";
import PopUpModal from "./PopUpModal";
import {useHttpClient} from "../../../shared/hooks/http-hook";
import {AuthContext} from "../../../shared/context/auth-context";

const WeekSection = (props) => {
    const { startDate, endDate, color, jid } = props.weekInfo

    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    // console.log('week section',color)
    const auth = useContext(AuthContext)
    const [infoDetailStatus, setInfoDetailStatus] = useState(false)
    const [journal, setJournal] = useState('')

    const cubeClickHandler = async() => {
        console.log(jid)
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
    }
    const handleClose = () => {
        setInfoDetailStatus(false)
    }
    // <Tooltip id={`tooltip-top`}>
    //     {props.weekInfo.startDate.toDateString()} - {props.weekInfo.endDate.toDateString()}
    // </Tooltip>
    return (
        <div>
            <div className={styles.weekCubeWrapper}>
                <div className={styles.weekCube} style={{backgroundColor: `${color}`}} onClick={cubeClickHandler}/>
                <div className={styles.weekCubeInfo}>
                    <div>
                        {`${startDate.getMonth()+1}/${startDate.getDate()} - ${endDate.getMonth()+1}/${endDate.getDate()}`}
                    </div>
                </div>
                <PopUpModal showModal={infoDetailStatus} onHandleClose={handleClose} info={props.weekInfo} journal={journal} mode={"week"} />
                {/*<Modal*/}
                {/*    show={infoDetailStatus}*/}
                {/*    onHide={handleClose}*/}
                {/*    backdrop="static"*/}
                {/*    keyboard={false}*/}
                {/*>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title>Week Information</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}
                {/*        I will not close if you click outside me. Don't even try to press*/}
                {/*        escape key.*/}
                {/*    </Modal.Body>*/}
                {/*    <Modal.Footer>*/}
                {/*        <Link to={`/add-week-journal?startDate=${startDate.toString()}&endDate=${endDate.toString()}`} >*/}
                {/*            <Button onClick={handleClose}>Edit</Button>*/}
                {/*        </Link>*/}
                {/*    </Modal.Footer>*/}
                {/*</Modal>*/}
            </div>

        </div>
    );
};

export default WeekSection;
