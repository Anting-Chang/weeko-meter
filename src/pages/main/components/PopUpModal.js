import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const PopUpModal = (props) => {
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
                    <p>{props.year}</p>
                </div>}
            </Modal.Header>
            <Modal.Body>
                {props.mode === 'week' && <div>{props.info.text}</div>}
                {props.mode === 'quarter' && <div>{props.info.quarterText}</div>}
            </Modal.Body>
            <Modal.Footer>
                {props.mode === 'week' && <Link
                    to={`/add-week-journal?startDate=${props.info.startDate.toString()}&endDate=${props.info.endDate.toString()}`}>
                    <Button onClick={props.onHandleClose}>Edit</Button>
                </Link>}
                {props.mode === 'quarter' && <Link
                    to={`/add-week-journal?year=${props.year}&quarter=${props.info.numQuarter}`}>
                    <Button onClick={props.onHandleClose}>Edit</Button>
                </Link>}
                {props.mode === 'year' && <Link
                    to={`/add-week-journal?startDate=${props.info.startDate.toString()}&endDate=${props.info.endDate.toString()}`}>
                    <Button onClick={props.onHandleClose}>Edit</Button>
                </Link>}
            </Modal.Footer>
        </Modal>
    );
};

export default PopUpModal;
