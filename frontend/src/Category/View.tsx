import React, {useState, useEffect, ChangeEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import CategoryDataService from "../services/category.service";
import {ICategory} from "../types/type";
import Trash from "../assets/trash";
import EditIcon from "../assets/editIcon";
import axios from 'axios';

const View = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const initialCategoryState = {
        id: null,
        name: ""
    };

    const [category, setCategory] = useState<ICategory>(initialCategoryState);
    const [message, setMessage] = useState<string>("");

    // const getCategory = (id: string) => {
    //     CategoryDataService.get(id)
    //         .then((response: any) => {
    //             setCurrenCategory(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((e:Error)=>{
    //             console.log(e);
    //         });
    // };

    useEffect(() => {
        async function getCategory() {
            try {
                const category = await axios.get(`http://localhost:8092/api/category/${id}`)
                setCategory(category.data);
            }
            catch (error: any) {
                console.log('Somsing get wrong')
            }
        }
        
            getCategory();
    }, [id]);

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const {name, value} = event.target;
    //     setCategory({...category, [name]: value});
    // };

    function handleClick() {
        navigate('/categories/all')
    }

    // const updateCategory = () => {
    //     CategoryDataService.update(currentCategory.id, currentCategory)
    //         .then((response: any) => {
    //             console.log(response.data);
    //             setMessage("Категорія обновилася успішно!");
    //
    //         })
    //         .catch((e:Error)=>{
    //             console.log(e);
    //         });
    // };
    //
    // const deleteCategory = () => {
    //     CategoryDataService.remove(currentCategory.id)
    //         .then((response: any) => {
    //             console.log(response.data);
    //             navigate("/category/get");
    //         })
    //         .catch((e:Error) => {
    //             console.log(e);
    //         });
    // };


    return (
        <div>

                <div className="cartCategory">
                    <h4>Категорія</h4>
                    <form>
                        <label htmlFor="name">Назва</label>
                        <div className="form-group dFlex">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={category.name}
                                // onChange={handleInputChange}
                                // placeholder={currentCategory.name}
                            />
                        </div>
                        <p>{message}</p>
                        <button>Назад</button>
                    </form>
                    {/*<button*/}
                    {/*    className="delBtn m20"*/}
                    {/*    onClick={deleteCategory}>*/}
                    {/*    <Trash />*/}
                    {/*    Видалити*/}
                    {/*</button>*/}

                    {/*<button*/}
                    {/*    type="submit"*/}
                    {/*    className="editBtn m20"*/}
                    {/*    onClick={updateCategory}>*/}
                    {/*    <EditIcon />*/}
                    {/*    Оновити*/}
                    {/*</button>*/}
                </div>
        </div>
    );
};


export default View;