import {Link, Outlet} from "react-router-dom";
import React, {FC, useEffect, useState} from "react";
import classes from "./Header/Header.module.scss";
import styles from "./CompanyInfarmation/CompanyInformation.module.scss";
import {ClockSvg} from "./svgs/clock";
import {CompanyInformation as CompanyInfo} from "./constants/company-information";
import {PhoneSvg} from "./svgs/phone";
import Products from "./pages/Products";
import IUser from "./types/user.type";
import * as AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import {logout} from "./services/auth.service";
import HeaderContainer from "./Container/HeaderContainer";

export const Layout: FC = () => {
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if(user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
        }

        EventBus.on("logout", logout);

        return () => {
            EventBus.remove("logout", logout);
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    }
    return (
        <div>
        <div className={classes.shopHeader}>
            <div className={classes.topBar}>
                <div className={styles.dFlex}>
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

                        {showAdminBoard && (
                        <Link to="/admin">
                            <span className={styles.enter} >Адмін</span></Link>
                        )}

                        {/*{currentUser && (*/}
                        {/*    <Link to={"/user"}>*/}
                        {/*        User*/}
                        {/*    </Link>*/}
                        {/*)}*/}

                        {currentUser ? (
                            <div className="d-flex">
                            <Link to={"/profile"} className="currentUser">
                                {currentUser.name.substring(0, 1)} {currentUser.surname.substring(0, 1)}
                            </Link>
                            <a href="/" className="nav-link" onClick={logOut}>
                                Вийти
                            </a>
                            </div>

                        ) : (
                            <div>
                            <Link to="/login">
                            <span className={styles.enter} >Увійти</span></Link>
                            <span>|</span>
                            <Link to="/register"><span className={styles.register}>Зареєструватися</span></Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>

            <Outlet/>
{/*<Products/>*/}
            <footer>2022 BuyAll</footer>
        </div>
    )
}