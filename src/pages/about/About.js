import React from 'react';

import styles from './About.module.css'
import {FaGithub} from "react-icons/all";

const About = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.contentWrapper}>
                <div style={{fontSize: '2rem', fontWeight: 'bold'}}>Under Construction</div>
                <div style={{color: '#666',marginBottom: '20px'}}>Try github</div>
                <a href="https://github.com/Anting-Chang/weeko-meter">
                    <FaGithub className={styles.github} />
                </a>
            </div>
        </div>
    );
};

export default About;
