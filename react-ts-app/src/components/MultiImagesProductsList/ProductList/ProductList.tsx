import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useEffect} from "react";
import {useActions} from "../../../hooks/useActions";
import {Link} from 'react-router-dom';
import EditIcon from "../../../assets/editIcon";

const ProductList: React.FC = () => {

    const {products} = useTypedSelector((store) => store.productinstance);
    const {fetchProducts} = useActions();
    const {category} = useTypedSelector((store) => store.categoryinstance);
    
    useEffect(() => {
        fetchProducts();
        console.log("products", products);
    }, []);

    return (
        <>
            <div className="m30">
                <div className="mb20">
                    <Link to="/products/add">
                        <button className="btnAddProd">+ ДОДАТИ</button>
                    </Link>
                </div>
                {<table className=" table table-bordered mt-5" style={{borderColor: '#00008B'}}>
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Ціна</th>
                        <th scope="col">Опис</th>
                        <th scope="col">Зображення</th>
                        {/*<th scope="col">Наявність</th>*/}
                        <th scope="col">Додати характеристики</th>
                    </tr>
                    </thead>
                    {<tbody>
                    {products && products.map((item) => {
                        return (
                            <tr key={item.id} className="border-r">
                                {<th scope="row">{item.id}</th>}
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <img src={item.urlImage}
                                         alt="photos"
                                         width="100"
                                    />
                                </td>
                                {/*<td>{item.availability}</td>*/}
                                <Link to={`/productsById/${item.id}`}>
                                <td className='p8'><div className="mx-5 dFlex space-even"><EditIcon/></div></td>
                                </Link>
                            </tr>
                        );
                    })}
                    </tbody>}
                </table>}
            </div>
        </>
    );
};

export default ProductList;