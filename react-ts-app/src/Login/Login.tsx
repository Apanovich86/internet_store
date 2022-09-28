import React, {useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {login} from "../services/auth.service";
import {useNavigate} from "react-router";
import Auth_close from "../assets/auth_close";
import UserSvg from "../assets/user";
import PadlockSvg from "../assets/padlock";


const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const navigate = useNavigate();
    const onClose = () => {
        navigate("/")
    }

    const initialValues: {
        username: string;
        password: string;
    } = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                "len",
                "Введіть коректне ім'я від 3 до 20 символів.",
                (val: any) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required('Це поле не повинно бути пустим!'),

        password: Yup.string()
            .test(
                'regex',
                'Пароль має бути не менше 6 символів, містити цифри, великі літери та хоча б один із спецсимволів: (#?!@$%^&*_+=-)',
                (val) => new RegExp(/^(?=.*[A-ZА-Я])(?=.*\d)(?=.*?[#?!@$%^&*_+=-]).*$/g).test(val!)
            )
            .test('regex', 'Пароль не може містити пробіли', (val) => {
                const result = new RegExp(/[\s]/g).test(val!);

                return !result;
            })
            .min(6, 'Пароль занадто короткий!')
            .required('Це поле не повинно бути пустим!'),
    });

    const handleLogin = (formValue: { username: string; password: string }) => {
        const {username, password} = formValue;

        setMessage("");
        setLoading(true);

        login(username, password).then(
            () => {

                navigate("/");
                window.location.reload();
            },
            (error: any) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card_modal card-container mtb105">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <div className="form-register">
                            <div onClick={onClose} className="btn_close">
                                <Auth_close/>
                            </div>
                            <label htmlFor="username"> Увійти </label>
                            <div className="form-group">
                                <div className="d-flex">
                                    <div className="icon-register">
                                        <UserSvg/>
                                    </div>
                                    <Field placeholder="Ім'я користувача" name="username" type="text"
                                           className="form-control"/>
                                </div>
                            </div>
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="error-msg alert alert-danger"
                            />

                            <div className="form-group">
                                <div className="d-flex">
                                    <div className="icon-register">
                                        <PadlockSvg/>
                                    </div>
                                    <Field
                                        placeholder="Введіть пароль"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="error-msg alert alert-danger"
                            />

                            <div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>Увійти
                                </button>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                            </div>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;