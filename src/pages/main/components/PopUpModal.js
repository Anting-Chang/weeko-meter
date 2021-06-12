import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const quarterMap = {
    1: 'First Quarter',
    2: 'Second Quarter',
    3: 'Third Quarter',
    4: 'Fourth Quarter',
}

const PopUpModal = (props) => {
    const { jid } = props.info

    return (
        <Modal
            show={props.showModal}
            onHide={props.onHandleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                {props.mode === 'week' && <div>
                    <Modal.Title>Week Information</Modal.Title>
                    <p>{props.info.startDate.toDateString()} - {props.info.endDate.toDateString()}</p>
                </div>}
                {props.mode === 'quarter' && <div>
                    <Modal.Title>Quarter Information</Modal.Title>
                    <p>{quarterMap[props.quarter]}</p>
                </div>}
                {props.mode === 'year' && <div>
                    <Modal.Title>Year Information</Modal.Title>
                    <p>{props.info.currentYear}</p>
                </div>}
            </Modal.Header>
            <Modal.Body>
                {!props.journal && <div style={{color: '#999'}}>Does not have a journal ... yet :)</div>}
                {props.mode === 'week' && props.journal && <div>{props.journal}</div>}
                {props.mode === 'quarter' && props.journal && <div>{props.journal}</div>}
                {props.mode === 'year' && props.journal && <div>{props.journal}</div>}
            </Modal.Body>
            <Modal.Footer>
                {props.mode === 'week' && <Link
                    to={`/add-journal/${props.info.yearNum}/${props.info.quarter}/${props.info.weekNum}/${jid}/week`}>
                    <Button onClick={props.onHandleClose}>{props.journal ? 'Edit Journal' : 'Add A Journal'}</Button>
                </Link>}
                {props.mode === 'quarter' && <Link
                    to={`/add-journal/${props.info.yearNum}/${props.info.quarter}/-1/${jid}/quarter`}>
                    <Button onClick={props.onHandleClose}>{props.journal ? 'Edit Journal' : 'Add A Journal'}</Button>
                </Link>}
                {props.mode === 'year' && <Link
                    to={`/add-journal/${props.info.yearNum}/-1/-1/${jid}/year`}>
                    <Button onClick={props.onHandleClose}>{props.journal ? 'Edit Journal' : 'Add A Journal'}</Button>
                </Link>}
            </Modal.Footer>
        </Modal>
    );
};

export default PopUpModal;
