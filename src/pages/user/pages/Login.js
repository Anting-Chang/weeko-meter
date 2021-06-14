import React, {useState, useContext} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from "react-bootstrap/Alert";

import styles from './Login.module.css'
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {useHistory} from "react-router-dom";

const Login = (props) => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [isSignup, setIsSignup] = useState(false)

    const loginHandler = async (values) => {
        try {
            const responseData = await sendRequest('users/login', 'POST',
                JSON.stringify({
                    email: values.loginEmail,
                    password: values.loginPassword
                }),
                {'Content-Type': 'application/json'}
            )
            auth.login(responseData.userId, responseData.token)
            console.log('signing in', responseData.weekObj)
            if (responseData.weekObj.birthday == null) {
                console.log('years is null')
                history.push('/setup')
            } else {
                history.push('/')
            }

            // console.log(auth.userId)
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                clearError()
            },5000)
        }
    }

    const signupHandler = async (values) => {
        try {
            const responseData = await sendRequest('users/signup', 'POST',
                JSON.stringify({
                    name: values.signupName,
                    email: values.signupEmail,
                    password: values.signupPassword
                }),
                {'Content-Type': 'application/json'}
            )
            console.log('responseDate')
            console.log(responseData)
            auth.login(responseData.user.id, responseData.token)
            console.log('signing up',responseData.user)
            if (responseData.user.weekObj == null) {
                console.log('signing up pushed to setup')
                history.push('/setup')
            }
            // console.log(auth.userId)
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                clearError()
            },5000)
        }
    }

    const formikSignup = useFormik({
        initialValues: {
            signupName: '',
            signupPassword: '',
            signupEmail: '',
        },
        validationSchema: Yup.object({
            signupName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            signupPassword: Yup.string()
                .min(6, 'Must be at 6 characters')
                .required('Required'),
            signupEmail: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: signupHandler,
    });

    const formikLogin = useFormik({
        initialValues: {
            loginEmail: '',
            loginPassword: '',
        },
        validationSchema: Yup.object({
            loginEmail: Yup.string().email('Invalid email address').required('Required'),
            loginPassword: Yup.string()
                .required('Required'),
        }),
        onSubmit: loginHandler,
    });

    return (
        <div className={styles.centerDiv}>
            <div className={styles.loginWrapper}>
                <div className={styles.descWrapper}>
                    <div className={styles.descTitle}>Welcome</div>
                    <div className={styles.descContent}>Make week journal is easier than before !</div>
                </div>
                {!isSignup && <div className={styles.login}>
                    <div className={styles.loginTitle}>Login</div>
                    <Form onSubmit={formikLogin.handleSubmit}>
                        <Form.Group controlId="loginEmail">
                            <Form.Label style={{color: '#999'}}>Email address</Form.Label>
                            <Form.Control
                                name="loginEmail"
                                type="email"
                                placeholder="Enter email"
                                onChange={formikLogin.handleChange}
                                onBlur={formikLogin.handleBlur}
                                value={formikLogin.values.loginEmail}
                                isValid={formikLogin.touched.loginEmail && !formikLogin.errors.loginEmail}
                                isInvalid={!!formikLogin.errors.loginEmail && formikLogin.touched.loginEmail}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikLogin.errors.loginEmail}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="loginPassword">
                            <Form.Label style={{color: '#999'}}>Password</Form.Label>
                            <Form.Control
                                name="loginPassword"
                                type="password"
                                placeholder="Password"
                                onChange={formikLogin.handleChange}
                                onBlur={formikLogin.handleBlur}
                                value={formikLogin.values.loginPassword}
                                isValid={formikLogin.touched.loginPassword && formikLogin.errors.loginPassword}
                                isInvalid={!!formikLogin.errors.loginPassword && formikLogin.touched.loginPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikLogin.errors.loginPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Alert variant="primary">
                            Use email:test@test.com password:123456 to login for testing or signup a new account
                        </Alert>
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
                        <div className={styles.loginToSignup} onClick={() => setIsSignup(true)}>Don't have an account? Sign up here</div>
                    </Form>
                </div>}
                {isSignup && <div className={styles.login}>
                    <div className={styles.loginTitle}>Sign Up</div>
                    <Form onSubmit={formikSignup.handleSubmit}>
                        <Form.Group controlId="signupName">
                            <Form.Label style={{color: '#999'}}>Name</Form.Label>
                            <Form.Control
                                name="signupName"
                                type="text"
                                placeholder="Enter username"
                                onChange={formikSignup.handleChange}
                                onBlur={formikSignup.handleBlur}
                                value={formikSignup.values.signupName}
                                isValid={formikSignup.touched.signupName && !formikSignup.errors.signupName}
                                isInvalid={!!formikSignup.errors.signupName && formikSignup.touched.signupName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikSignup.errors.signupName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="signupEmail">
                            <Form.Label style={{color: '#999'}}>Email address</Form.Label>
                            <Form.Control
                                name="signupEmail"
                                type="email"
                                placeholder="Enter email"
                                onChange={formikSignup.handleChange}
                                onBlur={formikSignup.handleBlur}
                                value={formikSignup.values.signupEmail}
                                isValid={formikSignup.touched.signupEmail && !formikSignup.errors.signupEmail}
                                isInvalid={!!formikSignup.errors.signupEmail && formikSignup.touched.signupEmail}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikSignup.errors.signupEmail}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="signupPassword">
                            <Form.Label style={{color: '#999'}}>Password</Form.Label>
                            <Form.Control
                                name="signupPassword"
                                type="password"
                                placeholder="Password"
                                onChange={formikSignup.handleChange}
                                onBlur={formikSignup.handleBlur}
                                value={formikSignup.values.signupPassword}
                                isValid={formikSignup.touched.signupPassword && !formikSignup.errors.signupPassword}
                                isInvalid={!!formikSignup.errors.signupPassword && formikSignup.touched.signupPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formikSignup.errors.signupPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
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
                        <div className={styles.loginToSignup} onClick={() => setIsSignup(false)}>Have an account? Login here</div>
                    </Form>
                </div>}
            </div>

        </div>
    );
};

export default Login;
