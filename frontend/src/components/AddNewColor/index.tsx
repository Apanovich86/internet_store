import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffect} from "react";
import {useFormik, FormikHelpers, Formik, Form} from "formik";
import {useActions} from "../../hooks/useActions";
import {useNavigate} from 'react-router';
import {IAddNewColor} from "./types";
import TextInput from "../../common/TextInput";
import * as React from "react";
import {Link} from 'react-router-dom';

const initialValues: IAddNewColor = {
    name: ""
};
const AddNewColor: React.FC = () => {

    const navigator = useNavigate();
    const {AddColors} = useActions();
    const {status} = useTypedSelector((store) => store.colorinstance);
    //console.log("Status:", status);

    const onSubmit = (values: IAddNewColor, helpers: FormikHelpers<IAddNewColor>) => {
        console.log("Values", values);
        AddColors({...values});
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    useEffect(() => {
        if (status == 200) {
            //console.log("useEffect done!");
            navigator("/colors/all");
        }

    }, [status, navigator]);

    const {errors, touched, handleChange, values, setFieldValue} = formik;

    return (
        <>
            <div className=" m30">
                <h1 className="text-center">Додати новий колір</h1>
                <form className="col-4 m50auto" onSubmit={(e) => formik.handleSubmit(e)}>

                    <TextInput
                        field="name"
                        label="Назва"
                        type="text"
                        touched={touched.name}
                        error={errors.name}
                        value={values.name}
                        onChange={handleChange}
                    />

                    <div className="text-center mb200 mt50">
                        <Link to={'/colors/all'}>
                            <button type="submit" className="btn btn-primary">
                                --Додати--
                            </button>
                        </Link>
                    </div>
                </form>
                <div className="col-4"></div>
            </div>
        </>
    )
};

export default AddNewColor;