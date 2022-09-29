import List from './List';
import React, {useState, ChangeEvent} from 'react';
import CategoryDataService from "../services/category.service";
import {ICategory} from "../types/type";

const CategoryHome = () => {
    const initialCategoryState = {
        id: null,
        name: ""
    };
    const [category, setCategory] = useState<ICategory>(initialCategoryState);
    const [submitted, setSetsubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCategory({...category, [name]: value});
    };

    async function onFormSubmit(e: any) {
        e.preventDefault()
        var data = {
            name: category.name
        };

        CategoryDataService.create(data)
            .then((response: any) => {
                setCategory({
                    id: response.data.id,
                    name: response.data.name
                });
                setSetsubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    if (submitted) {
        return <CategoryHome/>
    }

    const newCategory = () => {
        setCategory(initialCategoryState);
        setSetsubmitted(false);
    }
    return (
        <div>
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>Ви успішно додали!</h4>
                        <button
                            className="btn btn-success"
                            onClick={newCategory}
                        >
                            Додати
                        </button>
                    </div>
                ) : (
                    <div className="cartCategory">
                        <h4 className='m25'>
                        ДОДАТИ КАТЕГОРІЮ
                        </h4>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   required
                                   value={category.name}
                                   onChange={handleInputChange}
                                   name="name"
                                   placeholder="Назва"
                            />
                        </div>
                        <button onClick={e => onFormSubmit(e)} className="btnAddProd m25">+ ДОДАТИ</button>
                    </div>
                )}
            </div>
            <List/>
        </div>
    );
};

export default CategoryHome;