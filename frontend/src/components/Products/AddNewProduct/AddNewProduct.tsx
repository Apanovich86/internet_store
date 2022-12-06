import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useEffect} from "react";
import {useFormik, FormikHelpers, Formik, Form, Field, FormikProps} from "formik";
import {useActions} from "../../../hooks/useActions";
import {useNavigate} from 'react-router';
import {IAddNewProduct} from "../types";
import TextInput from "../../../common/TextInput";
import "cropperjs/dist/cropper.min.css";
import * as React from "react";
import {Link} from 'react-router-dom';
import SelectGroup from "../../../common/SelectGroup";
import {
    useState
} from "react";
import ImageInput from "../../../common/ImageInput";
import {useParams} from 'react-router-dom';
import {ISearchItem} from '../types';

const initialValues: IAddNewProduct = {
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    urlImage: "",
    colors: []
};
const AddNewProduct: React.FC = () => {

    const navigator = useNavigate();
    const {addProducts} = useActions();
    const {status} = useTypedSelector((store) => store.productinstance);
    const {searchedProductById} = useTypedSelector((store) => store.productinstance);
    const {category} = useTypedSelector((store) => store.categoryinstance);
    const {FetchCategories} = useActions();
    const [ide, setIde] = useState<number>();
    const res = useParams();
    const {FetchProductById} = useActions();

    async function getProduct(search: ISearchItem) {
        try {
            await FetchProductById(search);
        } catch (ex) {
            console.log("Error fetch in component id:", ex);
        }
    }

    useEffect(() => {
        const result = Number(res.id);
        setIde(result);
        const search: ISearchItem = {
            id: result
        };
        FetchCategories();
        getProduct(search);

    }, []);


    const onSubmit = (values: IAddNewProduct, helpers: FormikHelpers<IAddNewProduct>) => {
        addProducts({...values});
        console.log("Values", values);
        console.log('searchId', searchedProductById.id);
         navigator("/products");
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    useEffect(() => {
        if (status == 200) {
            navigator("/products");
        }

    }, [status, navigator]);


    const {errors, touched, handleChange, values, setFieldValue} = formik;

    return (
        <>
            <div className=" m30">
                <h1 className="text-center">Додати новий продукт</h1>
                <form className="col-4 m50auto" onSubmit={(e) => formik.handleSubmit(e)}>

                    <TextInput
                        field="title"
                        label="Назва"
                        type="text"
                        touched={touched.title}
                        error={errors.title}
                        value={values.title}
                        onChange={handleChange}
                    />

                    <TextInput
                        field="price"
                        label="Ціна"
                        type="text"
                        touched={touched.price}
                        error={errors.price}
                        value={values.price}
                        onChange={handleChange}
                    />

                    <TextInput
                        field="description"
                        label="Опис"
                        type="text"
                        touched={touched.description}
                        error={errors.description}
                        value={values.description}
                        onChange={handleChange}
                    />

                    <SelectGroup
                        label="Категорія"
                        field="categoryId"
                        values={category}
                        onChange={handleChange}
                        touched={touched.categoryId}
                        error={errors.categoryId}
                    />

                    <p className='mt20'>Виберіть зображення</p>

                    <ImageInput
                        label="Фото"
                        field="urlImage"
                        onChange={() => {
                        }}
                        error={errors.urlImage}
                        touched={touched.urlImage}
                        refFormik={setFieldValue}
                        type="file"
                    />

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

export default AddNewProduct;