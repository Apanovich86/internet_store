import React, {FC, useState, useEffect} from 'react';
import {MdKeyboardArrowDown} from "react-icons/md";
import ICategory from '../types/type';
import CategoryDataService from ".././services/category.service";
import {Link} from 'react-router-dom';

const CategoryList: FC = () => {
    const [categories, setCategories] = useState<Array<ICategory>>([]);
    const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    useEffect(() => {
        retrievCategories();
    }, []);

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

    const refreshList = () => {
        retrievCategories();
        setCurrentCategory(null);
        setCurrentIndex(-1);
    }

    const setActiveCategory = (category: ICategory, index: number) => {
        setCurrentCategory(category);
        setCurrentIndex(index);
        console.log("categoryIndex", index);
    }

    return (
        <div className="category-list">
            КАТЕГОРІЇ
            <MdKeyboardArrowDown size={18}/>
            <div className="dropdown-content">
                {categories &&
                    categories.map((category, index) => (
                        <Link to={`productsByCategory/${category.id}`}>
                            {category.name}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default CategoryList;