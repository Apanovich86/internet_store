import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/type";
import { register } from "../services/auth.service";
import {PhoneSvg} from "../assets/phone";
import UserSvg from "../assets/user";
import PadlockSvg from "../assets/padlock";
import MailSvg from "../assets/mail";
import Auth_close from "../assets/auth_close";
import {useNavigate} from "react-router";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();
  const onClose = () => {
    navigate("/")
  }

  const initialValues: IUser = {
    username: "",
    name: "",
    surname: "",
    phone: "",
    email: "",
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
      .required("Це поле не повинно бути пустим!"),

    name: Yup.string()
        .test(
            "len",
            "Введіть коректне ім'я від 3 до 20 символів.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        )
        .required("Це поле не повинно бути пустим!"),

    surname: Yup.string()
        .test(
            "len",
            "Введіть коректне призвіще від 3 до 20 символів.",
            (val: any) =>
                val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20
        )
        .required("Це поле не повинно бути пустим!"),

    phone: Yup.string()
        .matches(/(?:\w)(?:(?:(?:(?:\+?3)?8\W{0,5})?0\W{0,5})?[34569]\s?\d[^\w,;(\+]{0,5})?\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d\W{0,5}\d(?!(\W?\d))/, "Неправильний телефон!")
        .required('Це поле не повинно бути пустим!'),
    email: Yup.string()
      .email("Неправильна адреса!")
      .required("Це поле не повинно бути пустим!"),
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

  const handleRegister = (formValue: IUser) => {
    const { username, name, surname, phone, email, password } = formValue;

    register(username, name, surname, phone, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card_modal card-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div className="form-register">
                <div onClick={onClose} className="btn_close">
                  <Auth_close/>
                </div>
                <label htmlFor="username"> Реєстрація </label>
                <div className="form-group">
                  <div className="d-flex">
                  <div className="icon-register">
                    <UserSvg />
                  </div>
                  <Field placeholder="Ім'я користувача" name="username" type="text" className="form-control" />
                  </div>
                </div>
                <ErrorMessage
                    name="username"
                    component="div"
                    className="error-msg alert alert-danger"
                />
                <div className="form-group">
                  <Field placeholder="Ім'я" name="name" type="text" className="form-control" />
                </div>
                  <ErrorMessage
                      name="name"
                      component="div"
                      className="error-msg alert alert-danger"
                  />

                <div className="form-group">
                  <Field placeholder="Прізвище" name="surname" type="text" className="form-control" />
                </div>
                  <ErrorMessage
                      name="surname"
                      component="div"
                      className="error-msg alert alert-danger"
                  />

                <div className="form-group">
                  <div className="d-flex">
                  <div className="icon-register">
                      <PhoneSvg/>
                  </div>
                  <Field placeholder="Номер телефону" name="phone" type="text" className="form-control" />
                    </div>
                </div>
                <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-msg alert alert-danger"
                  />

                <div className="form-group">
                  <div className="d-flex">
                    <div className="icon-register">
                      <MailSvg/>
                    </div>
                    <Field  placeholder="Електронна пошта" name="email" type="email" className="form-control" />
                  </div>
                </div>
                  <ErrorMessage
                    name="email"
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
                  <button type="submit" className="btn btn-primary btn-block">Реєстрація</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
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

export default Register;
