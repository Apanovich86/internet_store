import React from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {ISearchItem} from '../CategoryList/types';
import {useActions} from "../../hooks/useActions";
import { useNavigate, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const UpdateCategory = () => {
    const {category, status} = useTypedSelector((store) => store.categoryinstance);
    // const {UpdateCategories, getCategoryById} = useActions();
    const {getCategoryById} = useActions();
    const navigator = useNavigate();
    const {id} = useParams();
    const _id = Number(id);

    useEffect(() => {
        getCategoryById(_id);
    }, [getCategoryById, _id]);

    const onHandleSubmit = async () => {
        // try {
        //     await UpdateCategories();
        //     navigator("/categories/all")
        // }
        // catch (error){
        //    
        // }
    }
    
    return (
        <>
            <div className="m30">
                <h1>Редагування категорії:</h1>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={getCategoryById.name}>
                        {/*<th scope="row">{searchedCategoryById.id}</th>*/}
                        <td>{getCategoryById.name}</td>
                    </tr>

                    </tbody>
                </table>
                <Link className="btn btn-info mb200 mt50" to={'/categories/all'}>Назад</Link>
            </div>
        </>
    )

}

export default UpdateCategory;