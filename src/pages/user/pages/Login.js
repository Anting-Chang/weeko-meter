import React, {useState} from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import styles from './Login.module.css'

const Login = (props) => {
    const [isSignup, setIsSignup] = useState(false)

    return (
        <div className={styles.centerDiv}>
            <div className={styles.loginWrapper}>
                <div className={styles.descWrapper}>
                    <div className={styles.descTitle}>Welcome</div>
                    <div className={styles.descContent}>Make week jornal is easier than before !</div>
                </div>
                {!isSignup && <div className={styles.login}>
                    <div className={styles.loginTitle}>Login</div>
                    <Form>
                        <Form.Group controlId="loginEmail">
                            <Form.Label style={{color: '#999'}}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group controlId="loginPassword">
                            <Form.Label style={{color: '#999'}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <div className={styles.loginToSignup} onClick={() => setIsSignup(true)}>Don't have an account? Sign up here</div>
                    </Form>
                </div>}
                {isSignup && <div className={styles.login}>
                    <div className={styles.loginTitle}>Sign Up</div>
                    <Form>
                        <Form.Group controlId="signupName">
                            <Form.Label style={{color: '#999'}}>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter username"/>
                        </Form.Group>
                        <Form.Group controlId="signupEmail">
                            <Form.Label style={{color: '#999'}}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group controlId="signupPassword">
                            <Form.Label style={{color: '#999'}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
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
