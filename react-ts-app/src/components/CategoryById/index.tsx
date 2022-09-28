import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {ISearchItem} from '../CategoryList/types';
import {useActions} from "../../hooks/useActions";
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

const CategorySearch: React.FC = () => {

    const res = useParams();
    const {searchedCategoryById} = useTypedSelector((store) => store.categoryinstance);
    const [ide, setIde] = useState<number>();
    const {FetchCategoryById} = useActions();

    async function getCategories(search: ISearchItem) {
        try {
            await FetchCategoryById(search);
        } catch (ex) {
            console.log("Error fetch in component id:", ex);

        }
    }

    useEffect(() => {
        const result = Number(res.id);
        setIde(result);
        const search: ISearchItem = {
            id: result
        };
        getCategories(search);
    }, []);


    return (
        <>
            <div className="m30">
                <h1>Деталі по категорії:</h1>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={searchedCategoryById.id}>
                        <th scope="row">{searchedCategoryById.id}</th>
                        <td>{searchedCategoryById.name}</td>
                    </tr>
                    </tbody>
                </table>
                <Link className="btn btn-info mb200 mt50" to={'/categories/all'}>Назад</Link>
            </div>
        </>
    )

}
export default CategorySearch;