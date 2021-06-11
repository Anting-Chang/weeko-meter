import React, {useState} from 'react';

import styles from './WeekSection.module.css'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import {Link} from "react-router-dom";
import PopUpModal from "./PopUpModal";

const WeekSection = (props) => {
    const { startDate, endDate } = props.weekInfo
    const [infoDetailStatus, setInfoDetailStatus] = useState(false)

    const cubeClickHandler = () => {
        setInfoDetailStatus(prevState => !prevState)
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
                <div className={styles.weekCube} onClick={cubeClickHandler}/>
                <div className={styles.weekCubeInfo}>
                    <div>
                        {`${startDate.getMonth()+1}/${startDate.getDate()} - ${endDate.getMonth()+1}/${endDate.getDate()}`}
                    </div>
                </div>
                <PopUpModal showModal={infoDetailStatus} onHandleClose={handleClose} info={props.weekInfo} mode={"week"} />
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
