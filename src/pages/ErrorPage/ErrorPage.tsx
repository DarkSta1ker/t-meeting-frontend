import React from 'react';
import styles from './ErrorPage.module.css';

export const ErrorPage: React.FC = () => {
    return (
        <div className={styles.section}>
            <div className={styles.text}>
                Произошла непредвиденная ошибка, либо данного URL не существует.
            </div>
            <div className={styles.imageSection}>
                <img src={process.env.PUBLIC_URL + '/fullLogo.png'}/>
            </div>
        </div>
    );
};
