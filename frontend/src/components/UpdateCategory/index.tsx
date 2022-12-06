import React, {useEffect, useState, ChangeEvent} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useFormik, FormikHelpers, Formik, Form} from "formik";
import {ISearchItem, ICategoryModel} from '../CategoryList/types';
import TextInput from "../../common/TextInput";
import {useActions} from "../../hooks/useActions";
import {useNavigate, useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import CategoryService from '../../services/category.service';
import {ICategory} from "../../types/type";

const UpdateCategory = () => {

    const initialCategoryState: ICategory = {
        id: null,
        name: "",
    };

    const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
    const [ide, setIde] = useState<number>();
    const {category, status, searchedCategoryById} = useTypedSelector((store) => store.categoryinstance);
    const {UpdateCategory, FetchCategoryById, getCategoryById} = useActions();
    const navigator = useNavigate();
    const {id} = useParams();
    const _id = Number(id);

    const initValues: ICategoryModel = {
        id: searchedCategoryById.id,
        name: searchedCategoryById.name,
    }

    async function getCategory(id: number) {
        CategoryService.get(id)
            .then((response: any) => {
                setCurrentCategory(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        if(_id)
        getCategory(_id);
    }, [_id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    const onHandleSubmit = async () => {
        try {
            await UpdateCategory(_id, currentCategory);
            navigator("/categories/all");
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: onHandleSubmit
    });

    const {errors, touched, handleChange, values, setFieldValue} = formik;

    return (
        <>
            <div className="m30">
                <h1>Редагування категорії:</h1>

                <form className="col-4 m50auto" onSubmit={(e) => formik.handleSubmit(e)}>

                    <TextInput
                        field="id"
                        label="id"
                        type="text"
                        touched={touched.id}
                        error={errors.id}
                        value={currentCategory.id}
                        onChange={handleInputChange}
                    />

                    <TextInput
                        field="name"
                        label="Назва"
                        type="text"
                        touched={touched.name}
                        error={errors.name}
                        value={currentCategory.name}
                        onChange={handleInputChange}
                    />

                    <div className="text-center mb200 mt50">
                        <button type="submit" className="btn btn-primary">
                            --Змінити--
                        </button>
                    </div>
                </form>

                <Link className="btn btn-info mb200 mt50" to={'/categories/all'}>Назад</Link>
            </div>
        </>
    )

}

export default UpdateCategory;