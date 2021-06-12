import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import styles from './AddJornal.module.css';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useHttpClient} from "../../../shared/hooks/http-hook";
import {AuthContext} from "../../../shared/context/auth-context";
import ColorChoosingButton from "../../../shared/components/Buttons/ColorChoosingButton";

const AddJornal = (props) => {
    const { yearNum, quarter, weekNum, jid, mode } = useParams()
    const auth = useContext(AuthContext)
    const history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [title, setTitle] = useState()
    const [color, setColor] = useState()
    const [ifCreateMode, setIfCreateMode] = useState(true)

    useEffect(() => {
        if (jid != 0) {
            setIfCreateMode(false)
        }

        const getJournalById = async() => {
            if (!ifCreateMode) {
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
                    await formik.setFieldValue('journal', responseData.journal.journal)
                } catch (e) {
                    console.log(e)
                    setTimeout(() => {
                        clearError()
                    },5000)
                }
            }
        }
        getJournalById()
        switch (mode) {
            case 'week':
                setTitle('Weekly Journal')
                break;
            case 'quarter':
                setTitle('Quarterly Journal')
                break;
            case 'year':
                setTitle('Yearly Journal')
                break;
        }
        console.log(yearNum,quarter,weekNum,jid,mode)
    }, [])

    const postJournal = async (values) => {
        console.log(values.journal)
        if (ifCreateMode) {
            try {
                const responseData = await sendRequest('content/postJournal', 'POST',
                    JSON.stringify({
                        journal: values.journal,
                        yearNum: yearNum,
                        quarter: quarter,
                        weekNum: weekNum,
                        mode: mode,
                        color: color
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                history.push('/')
                console.log(responseData)
            } catch (e) {
                console.log(e)
                setTimeout(() => {
                    clearError()
                },5000)
            }
        } else {
            try {
                const responseData = await sendRequest('content/updateJournal', 'PATCH',
                    JSON.stringify({
                        jid: jid,
                        journal: values.journal,
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                )
                history.push('/')
                console.log(responseData)
            } catch (e) {
                console.log(e)
                setTimeout(() => {
                    clearError()
                },5000)
            }
        }

    }

    const changeColor = (colorValue) => {
        setColor(colorValue)
        console.log('color value',colorValue)
    }

    const formik = useFormik({
        initialValues: {
            journal: '',
        },
        validationSchema: Yup.object({
            journal: Yup.string().max(2000).required('Required'),
        }),
        onSubmit: postJournal,
    });

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.formWrapper}>
                <div className={styles.formTitle}>{title}</div>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="journal">
                        <Form.Control
                            as="textarea"
                            name="journal"
                            key="journal"
                            type="textarea"
                            placeholder="Enter journal"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.journal}
                            isValid={formik.touched.journal && !formik.errors.journal}
                            isInvalid={!!formik.errors.journal}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.journal}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {ifCreateMode && <div style={{marginBottom: '20px'}}>
                        <div style={{fontSize: '1rem', color:'#666'}}>Choose a cube color</div>
                        <ColorChoosingButton onChooseColor={changeColor}/>
                    </div>}
                    {error && <Alert variant="danger">
                        {error}
                    </Alert>}
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

        </div>
    );
};

export default AddJornal;
