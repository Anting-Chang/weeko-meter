import React, {useContext} from 'react';
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {useFormik} from "formik";
import {useHttpClient} from "../../../shared/hooks/http-hook";

import styles from './SetUp.module.css'
import {createWeek} from "../../../shared/util/create-week";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../shared/context/auth-context";

const SetUp = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const history = useHistory()
    const auth = useContext(AuthContext)

    const regDate = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
    const regNumYear = /^[1-9]$|^[1-9][0-9]$|^(100)$/


    const setupHandler = async (values) => {
        console.log('setupHandler',values.yearNum,values.dateBirth)
        const weekObj = {
            yearJournal: [],
            quarterJournal: [],
            weekJournal: [],
            expectedYears: values.yearNum,
            birthday: values.dateBirth
        }
        try {
            const responseData = await sendRequest('users/setup', 'POST',
                JSON.stringify({
                    weekObj: weekObj
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            console.log(responseData.userId)
            history.push('/')
            // console.log(auth.userId)
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                clearError()
            },5000)
        }
    }

    const validate = values => {
        const errors = {};

        if (!values.yearNum) {
            errors.yearNum = 'Required';
        } else if (!regNumYear.test(values.yearNum)) {
            errors.yearNum = 'Must be integer between 0-100';
        }

        if (!values.dateBirth) {
            errors.dateBirth = 'Required';
        } else if (!regDate.test(values.dateBirth)) {
            errors.dateBirth = 'Invalid date of birth, Please use YYYY-MM-DD';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            yearNum: '',
            dateBirth: '',
        },
        validate,
        onSubmit: setupHandler,
    });

    return (
        <div className={styles.setupFormWrapper}>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="yearNum">
                    <Form.Label style={{color: '#999'}}>How many years to include</Form.Label>
                    <Form.Control
                        name="yearNum"
                        type="text"
                        placeholder="Enter number of Years"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.yearNum}
                        isValid={formik.touched.yearNum && !formik.errors.yearNum}
                        isInvalid={!!formik.errors.yearNum}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.yearNum}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="dateBirth">
                    <Form.Label style={{color: '#999'}}>Your birthday</Form.Label>
                    <Form.Control
                        name="dateBirth"
                        type="text"
                        placeholder="Enter your date of birth, YYYY-MM-DD"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dateBirth}
                        isValid={formik.touched.dateBirth && !formik.errors.dateBirth}
                        isInvalid={!!formik.errors.dateBirth}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.dateBirth}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {isLoading && <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />}
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default SetUp;
