import React, {useState, useEffect, ChangeEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import CategoryDataService from "../services/category.service";
import {ICategory} from "../types/type";

const UpdateCategory = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const initialCategoryState = {
        id: null,
        name: ""
    };

    const [currentCategory, setCurrenCategory] = useState<ICategory>(initialCategoryState);
    const [message, setMessage] = useState<string>("");

    const getCategory = (id: any) => {
        CategoryDataService.get(id)
            .then((response: any) => {
                setCurrenCategory(response.data);
                console.log(response.data);
                // window.location.reload();
            })
            .catch((e:Error)=>{
                console.log(e);
            });
    };

    useEffect(()=> {
        if(id)
            getCategory(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCurrenCategory({...currentCategory, [name]:value});
    };

    const updateCategory = () => {
        CategoryDataService.update(currentCategory.id, currentCategory)
            .then((response: any) => {
                console.log(response.data);
                setMessage("Категорія обновилася успішно!");
                navigate("/categories/all");
            })
            .catch((e:Error)=>{
                console.log(e);
            });
    };

    const deleteCategory = () => {
        CategoryDataService.remove(currentCategory.id)
            .then((response: any) => {
                console.log(response.data);
                navigate("/categories/all");
            })
            .catch((e:Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentCategory? (
                <div className="edit-form">
                    <h4>Категорія</h4>
                    <form>
                        <div className="form-group dFlex">
                            <label htmlFor="name">Назва</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentCategory.name}
                                placeholder={currentCategory.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <p>{message}</p>
                    </form>
                    {/*<button*/}
                    {/*    type="submit"*/}
                    {/*    className="input-group-text btn-success"*/}
                    {/*> Пошук*/}
                    {/*</button>*/}
                    <button
                        className="badge badge-success"
                        onClick={deleteCategory}>
                        Видалити
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateCategory}>
                        Оновити
                    </button>
                </div>
            ):(
                <div>
                    <br/>
                    <p>Будь-ласка виберіть категорію...</p>
                </div>
            )}
        </div>
    );
};

export default UpdateCategory;