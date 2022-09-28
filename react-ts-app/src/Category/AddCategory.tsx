import React, {useState, ChangeEvent} from 'react';
import CategoryDataService from "../services/category.service";
import {ICategory} from "../types/type";

const AddCategory: React.FC = () => {
    const initialCategoryState = {
        id: null,
        name: ""
    };
    const [category, setCategory] = useState<ICategory>(initialCategoryState);
    const [submitted, setSetsubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCategory({...category, [name]:value});
    };

    const saveCategory = () => {
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
            .catch((e:Error) => {
                console.log(e);
            });
    };

    const newCategory = () => {
        setCategory(initialCategoryState);
        setSetsubmitted(false);
    }

    return (
        <div className="submit-form">
            { submitted ? (
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
                    <button onClick={saveCategory} className="btn btn-success darkcornflow m25">
                        Зберегти
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddCategory;