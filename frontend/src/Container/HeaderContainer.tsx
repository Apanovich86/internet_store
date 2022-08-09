import React, {FC} from "react";
import styles from "./HeaderContainer.module.scss";

const HeaderContainer: FC = () => {
    return (
        <div className={styles.container}>
        <div className={styles.logo}>buy All</div>

        </div>
    )
}

export default HeaderContainer;