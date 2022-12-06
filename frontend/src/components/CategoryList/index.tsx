import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffect} from "react";
import {useActions} from "../../hooks/useActions";
import {Link} from 'react-router-dom';
import Info from "../../assets/info";
import Trash from "../../assets/trash";
import EditIcon from "../../assets/editIcon";

const CategoryList: React.FC = () => {

    const {category} = useTypedSelector((store) => store.categoryinstance);
    const {FetchCategories, DeleteCategories} = useActions();

    useEffect(() => {
        FetchCategories();
    }, []);

    const handleDelete = (id: number) => {
        DeleteCategories(id);
    }


    return (
        <>
            <div className="m30">
                <div className="mb20">
                    <Link to="/category/add">
                        <button className="btnAddProd">+ ДОДАТИ</button>
                    </Link>
                </div>
                {<table className=" table table-bordered mt-5 mb200" style={{borderColor: '#00008B'}}>
                    <thead className="table-dark">
                    <tr className="border-r">
                        <th scope="col">Id</th>
                        <th scope="col">Назва</th>
                        <th className="text-align" scope="col">Опції</th>
                    </tr>
                    </thead>
                    {<tbody>
                    {category && category.map((item) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>
                                    <div className="mx-5 dFlex space-even">
                                        <Link to={`/category/${item.id}`}><Info/></Link>
                                        <div><Link to={`/category/update/${item.id}`}><EditIcon/></Link></div>
                                        <div onClick={() => {
                                            handleDelete(item.id);
                                        }}><Trash/></div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>}
                </table>}
            </div>
        </>
    );
};

export default CategoryList;