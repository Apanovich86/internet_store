import React, {FC} from 'react';
import styles from './CompanyInformation.module.scss';
import { CompanyInformation as CompanyInfo } from '../constants/company-information';
import { PhoneSvg} from "../svgs/phone";
import {ClockSvg} from "../svgs/clock";
import {Link} from "react-router-dom";

const CompanyInformation: FC = () => {
    return  <div className={styles.dFlex}>
    <div className={styles.companyInformation}>
        <div className={styles.dFlex}>
            <div className={styles.svg}>
                <ClockSvg/>
            </div>
            <span className={styles.mw}>Графік роботи: {CompanyInfo.SCHEDULE} </span>
        </div>
        <div className={styles.dFlex}>
        <div className={styles.svg}>
            <PhoneSvg/>
            </div>
           <span>{CompanyInfo.PHONE_NUMBER_1}</span>
        </div>
        </div>
        <div className={styles.switch}>

            <Link className={styles.txt_dec} to="/login">
            <span className={styles.enter} >Увійти</span></Link>
            <span>|</span>
            <Link className={styles.txt_dec} to="/register"><span className={styles.register}>Зареєструватися</span></Link>
        </div>
    </div>;
};

export default CompanyInformation;