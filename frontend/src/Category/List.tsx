import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import {MdKeyboardArrowDown} from "react-icons/md";
import {Link} from 'react-router-dom';
import CategoryDataService from "../services/category.service";
import {ICategory} from "../types/type";
import Info from "../assets/info";
import EditIcon from "../assets/editIcon";
import Trash from "../assets/trash";
import axios from 'axios';

const List = () => {
    const [categories, setCategories] = useState<Array<ICategory>>([]);
    // const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);
    // const [currentIndex, setCurrentIndex] = useState<number>(-1);
    // const [searchTitle, setSearchTitle] = useState<string>("");

    useEffect(() => {
        retrievCategories();
    }, []);

    // const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     const searchName = e.target.value;
    //     setSearchTitle(searchName);
    // }

    const retrievCategories = () => {
        CategoryDataService.getAll()
            .then((response: any) => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    const handleDelete = (id:any) => {
        // await axios.delete(`http://localhost:8092/api/category/delete/${id}`);
        // var newCategory = categories.filter((item: any) => {
        //     return item.id !== id;
        // })
        // setCategories(newCategory);
        CategoryDataService.remove(id)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    };

    // const findByTitle = () => {
    //     CategoryDataService.findByTitle(searchTitle)
    //         .then((response: any) => {
    //             setCategories(response.data);
    //             setCurrentCategory(null);
    //             setCurrentIndex(-1);
    //             console.log(response.data);
    //         })
    //         .catch((e: Error) => {
    //             console.log(e);
    //         });
    // };
    return (
        <div className="list row m20">
            <div className="mb20">
                {/*<Link to="/category/add">*/}
                {/*    <button className="btnAddProd">+ ДОДАТИ</button>*/}
                {/*</Link>*/}
            </div>
            {/*<form className="mb20">*/}
            {/*    <div className="input-group mb-3">*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            className="form-control form-control-lg"*/}
            {/*            placeholder="Знайти за назвою"*/}
            {/*            value={searchTitle}*/}
            {/*            onChange={onChangeSearchTitle}*/}
            {/*        />*/}
            {/*        <button*/}
            {/*            type="submit"*/}
            {/*            className="input-group-text btn-success"*/}
            {/*            onClick={findByTitle}*/}
            {/*        ><i*/}
            {/*            className="bi bi-search me-2"></i> Пошук*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</form>*/}


            <div className="col-md-6">
                <h4 className='m25'> КАТЕГОРІЇ</h4>
                <ul className="list-group">
                    {categories &&
                        categories.map((category, index) => (
                            <div className="m10">
                                <li
                                    className="list-group-item innerListGroup"
                                    key={index}
                                >
                                    {category.name}
                                    <div>{category.id}</div>
                                    <br/>
                                    <div>
                                        <Link to={`/view/${category.id}`}>
                                            <Info/>
                                        </Link>
                                        <Link to={`/category/update/${category.id}`}>
                                            <EditIcon/>
                                        </Link>
                                        <div onClick={handleDelete}>
                                        <Trash/>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        ))}
                </ul>
            </div>
            {/*<div className="col-md-6">*/}
            {/*{currentCategory ? (*/}
            {/*    <div>*/}
            {/*        <h4>КАТЕГОРІЯ</h4>*/}
            {/*        <form></form>*/}
            {/*        <div className="dFlex alItemsCentr">*/}
            {/*            <label>*/}
            {/*                <strong>Назва:</strong>*/}
            {/*            </label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                className="form-control"*/}
            {/*                id="name"*/}
            {/*                name="name"*/}
            {/*                value={currentCategory.name}*/}
            {/*                // onChange={handleInputChange}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        /!*<p>{message}</p>*!/*/}
            {/*        <div className="mr30">*/}
            {/*            <Link to={`/categories/${currentIndex}`}>*/}
            {/*                <button*/}
            {/*                    type="submit"*/}
            {/*                    className="editBtn"*/}
            {/*                >*/}
            {/*                    <EditIcon />*/}
            {/*                    Оновити*/}
            {/*                </button>*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <div>*/}
            {/*        <br/>*/}
            {/*        <p>Будь ласка виберіть категорію...</p>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*</div>*/}
            <table className="table caption-top">
                <caption>List of users</caption>
                <thead>
                <tr>
                    {/*<th scope="col">#</th>*/}
                    {/*<th scope="col">First</th>*/}
                    {/*<th scope="col">Last</th>*/}
                    {/*<th scope="col">Handle</th>*/}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default List;