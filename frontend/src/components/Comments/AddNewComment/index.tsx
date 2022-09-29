import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useEffect} from "react";
import {useFormik, FormikHelpers, Formik, Form} from "formik";
import {useActions} from "../../../hooks/useActions";
import {useNavigate} from 'react-router';
import {IAddNewComment} from "../../Comments/types";
import TextInput from "../../../common/TextInput";
import * as React from "react";
import {Link} from 'react-router-dom';

const initialValues: IAddNewComment = {
    comment: "",
    rating: 0
};
const AddNewComment: React.FC = () => {

    const navigator = useNavigate();
    const {AddComments} = useActions();
    const {status} = useTypedSelector((store) => store.commentinstance);

    const onSubmit = (values: IAddNewComment, helpers: FormikHelpers<IAddNewComment>) => {
        console.log("Values", values);
        //AddComments({...values});
        navigator("/categories/all");
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    useEffect(() => {
        if (status == 200) {
            navigator("/categories/all");
        }

    }, [status, navigator]);

    const {errors, touched, handleChange, values, setFieldValue} = formik;

    return (
        <>
            <div className=" m30">
                <h1 className="text-center">Додати нову категорію</h1>
                <form className="col-4 m50auto" onSubmit={(e) => formik.handleSubmit(e)}>

                    {/*<TextInput*/}
                    {/*    field="name"*/}
                    {/*    label="Назва"*/}
                    {/*    type="text"*/}
                    {/*    touched={touched.name}*/}
                    {/*    error={errors.name}*/}
                    {/*    value={values.name}*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}

                    <div className="text-center mb200 mt50">
                        <button type="submit" className="btn btn-primary">
                            --Додати--
                        </button>
                    </div>
                </form>
                <div className="col-4"></div>
            </div>
        </>
    )
};

export default AddNewComment;