import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {ISearchItem} from '../types';
import {useActions} from "../../../hooks/useActions";
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import React from 'react';
import {createColorsInProduct} from '../../../services/color.service';
import {IColorModel} from "../../../components/AddNewColor/types";
// import CustomSelect from "../../../common/CustomSelect";
import {useFormik, FormikHelpers, Formik, Form, Field, FormikProps} from "formik";
import ColorService from "../../../http-common"
import ColorSelect from "../../../common/ColorSelect";

const initialValues: IColorModel = {
    id: 0,
    name: ""
};

const ProductById = () => {
    const res = useParams();
    const {searchedProductById} = useTypedSelector((store) => store.productinstance);
    const [ide, setIde] = useState<number>();
    const {FetchProductById, AddColorsToProduct} = useActions();
    const [colorToProduct, setColorToProduct] = useState<IColorModel>(initialValues);
    const [colors, setColors] = useState<Array<IColorModel>>([]);
    const {color} = useTypedSelector((store) => store.colorinstance);
    const {FetchColors} = useActions();

    const onSubmit = (values: IColorModel, helpers: FormikHelpers<IColorModel>) => {
        AddColorsToProduct(searchedProductById.id, {...values});
        console.log("Values", values);
        console.log('searchId', searchedProductById.id);
        // navigator("/products");
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    // const saveColorsInProduct = () => {
    //     const data:IColorModel  = {id: colors, name: data.name};
    //
    //     ColorDataService.createColorsInProduct(searchedProductById.id, data)
    //         .then((response: any) => {
    //             setColors({
    //                response
    //             });
    //             console.log(response.data);
    //         })
    //         .catch((e:Error) => {
    //             console.log(e);
    //         });
    // }


    // const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedOptions = event.currentTarget.selectedOptions;
    //     const newColors: any = [];
    //     for (let i = 0; i < selectedOptions.length; i++) {
    //         newColors.push(selectedOptions[i].value);
    //     }
    //     setColors(newColors);
    //     //AddColorsToProduct(searchedProductById.id, {...newColors});
    //     createColorsInProduct(searchedProductById.id, {...newColors});
    //     console.log("newColor", newColors);
    //     console.log("OurColor", colors);
    // };

    useEffect(() => {
        FetchColors();
    }, []);

    async function getProductById(search: ISearchItem) {
        try {
            await FetchProductById(search);
        } catch (ex) {
            console.log("Error fetch in component id:", ex);
        }
    }

    const saveColorToProduct = () => {
        var data = {
            name: colorToProduct.name
        };

        // createColorsInProduct(data)
        //     .then((response: any) => {
        //         setCategory({
        //             id: response.data.id,
        //             name: response.data.name
        //         });
        //         setSetsubmitted(true);
        //         console.log(response.data);
        //     })
        //     .catch((e:Error) => {
        //         console.log(e);
        //     });
    };

    useEffect(() => {
        const result = Number(res.id);
        setIde(result);
        const search: ISearchItem = {
            id: result
        };
        getProductById(search);
    }, []);

    const {errors, touched, handleChange, values, setFieldValue} = formik;

    return (
        <div>
            <h2>Додати колір до {searchedProductById.title}</h2>
            <p>Виберіть кольори</p>

            {/*<select multiple size={5} onChange={onChangeHandler} className="select">*/}
            {/*    {color.map((item) => {*/}
            {/*        return (*/}
            {/*            <option value={item.name} key={item.id}>{item.name}</option>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</select>*/}
            {/*<br/>*/}
            {/*<p className='fs'>*Windows: утримуйте клавішу Ctrl (для Mac: Command), а потім використовуйте мишу, щоб*/}
            {/*    вибрати кілька параметрів</p>*/}

            {/*<div>*/}
            {/*    {colors &&*/}
            {/*        colors.map((item) => <span className="color">{item.name}</span>*/}
            {/*        )}*/}
            {/*</div>*/}
            <form className="col-4 m50auto" onSubmit={(e) => formik.handleSubmit(e)}>
                <ColorSelect
                    label="Колір"
                    field="colorId"
                    values={color}
                    onChange={handleChange}
                    touched={touched.id}
                    error={errors.id}
                />

                <div className="text-center mb200 mt50">
                    <button type="submit" className="btn btn-primary">
                        --Додати--
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductById;
