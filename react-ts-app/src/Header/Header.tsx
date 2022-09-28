import React, {FC} from "react";
import styles from "./Header.module.scss";
import CompanyInformation from "../CompanyInfarmation/CompanyInformation";
import HeaderContainer from "../Container/HeaderContainer";

const Header: FC = () => {
    return (
        <div className={styles.shopHeader}>
            <div className={styles.topBar}>
                <CompanyInformation/>
                <HeaderContainer/>
            </div>
        </div>
    )
}

export default Header