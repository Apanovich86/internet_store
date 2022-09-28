import React, {FC, useState, useEffect, ChangeEvent} from 'react';
import {MdKeyboardArrowDown} from "react-icons/md";
import {Link} from 'react-router-dom';
import CategoryDataService from "../services/category.service";
import {ICategory} from "../types/type";
import Info from "../assets/info";
import EditIcon from "../assets/editIcon";

const CategoryAdmin: FC = () => {
    const [categories, setCategories] = useState<Array<ICategory>>([]);
    const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchTitle, setSearchTitle] = useState<string>("");

    useEffect(() => {
        retrievCategories();
    }, []);

    const currentCat = () => {
        console.log("currentIndex", currentIndex);
    }
    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.value;
        setSearchTitle(searchName);
    }

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
        console.log("setcateg", category.id);
        setCurrentIndex(index);
        console.log("index", index);
    }

    const findByTitle = () => {
        CategoryDataService.findByTitle(searchTitle)
            .then((response: any) => {
                setCategories(response.data);
                setCurrentCategory(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className="list row m20">
            <div className="mb20">
                <Link to="/category/add">
                    <button className="btnAddProd">+ ДОДАТИ</button>
                </Link>
            </div>
            <form className="mb20">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Знайти за назвою"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                        <button
                            type="submit"
                            className="input-group-text btn-success"
                            onClick={findByTitle}
                        ><i
                            className="bi bi-search me-2"></i> Пошук
                        </button>
                </div>
            </form>


            <div className="col-md-6">
                <h4> КАТЕГОРІЇ</h4>
                <ul className="list-group">
                    {categories &&
                        categories.map((category, index) => (
                            <div className="m10">
                                <li
                                    className="list-group-item innerListGroup"
                                    onClick={() => setActiveCategory(category, index)}
                                    key={index}
                                >
                                    {category.name}
                                    <br/>
                                   
                                    <div>

                                        <Info />
                                        {/*<Link to={`/updateCategory/${currentIndex}`}>*/}
                                        {/*<EditIcon />*/}
                                        {/*</Link>*/}
                                        {/*<Trash />*/}
                                    </div>
                                </li>

                               
                                
                            </div>
                            
                            
                            
                            
                        ))}
                </ul>
            </div>



            <div className="col-md-6">
                {currentCategory ? (
                    <div>
                        <h4>КАТЕГОРІЯ</h4>
                        <form></form>
                        <div className="dFlex alItemsCentr">
                            <label>
                                <strong>Назва:</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentCategory.id}
                                // onChange={handleInputChange}
                            />
                        </div>
                        {/*<p>{message}</p>*/}
                        <div className="mr30">
                            <Link to={`/updateCategory/${currentCategory.id}`}>
                                <button
                                    type="submit"
                                    className="editBtn"
                                >
                                    <EditIcon />
                                    Оновити
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Будь ласка виберіть категорію...</p>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default CategoryAdmin;

// import * as React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
// // const navigate = useNavigate();
//
// type Props = {};
// interface IState {
//     categories: any[];
// }
//
// export default class Home extends React.Component<Props, IState> {
//     constructor(props: Props) {
//         super(props);
//         this.state = { categories: [] }
//     }
//
//     public componentDidMount(): void {
//         axios.get(`http://localhost:8092/api/category/get`).then(data => {
//             this.setState({ categories: data.data })
//         })
//     }
//
//     public deleteCategory(id: number) {
//         axios.delete(`http://localhost:8092/api/category/delete/${id}`).then(data => {
//             const index = this.state.categories.findIndex(category => category.id === id);
//             this.state.categories.splice(index, 1);
//             // this.props.push('/categories/all')
//            // navigate('/categories/all');
//         })
//     }
//
//     public render() {
//         const categories = this.state.categories;
//         return (
//             <div>
//                 {categories.length === 0 && (
//                     <div className="text-center">
//                         <h2>No categories found at the moment</h2>
//                     </div>
//                 )}
//
//                 <div className="container">
//                     <div className="row">
//                         <table className="table table-bordered">
//                             <thead className="thead-light">
//                             <tr>
//                                 <th scope="col">Nazva</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {categories && categories.map(category =>
//                                 <tr key={category.id}>
//                                     <td>{category.name}</td>
//                                     <td>
//                                         <div className="d-flex justify-content-between align-items-center">
//                                             <div className="btn-group" style={{ marginBottom: "20px" }}>
//                                                 <Link to={`edit/${category.id}`} className="btn btn-sm btn-outline-secondary">Edit Category </Link>
//                                                 <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCategory(category.id)}>Delete Category</button>
//                                             </div>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//
//             </div>
//         )
//     }
// }

