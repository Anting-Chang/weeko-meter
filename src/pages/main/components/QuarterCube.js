import React from 'react';

import styles from './QuarterCube.module.css'

const QuarterCube = (props) => {
    return (
        <div className={styles.cube} style={{backgroundColor: `${props.color}`}} onClick={props.onCubeClick}>

        </div>
    );
};

export default QuarterCube;
