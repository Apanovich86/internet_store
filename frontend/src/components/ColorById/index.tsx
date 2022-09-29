import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { ISearchItem } from '../AddNewColor/types';
import { useActions } from "../../hooks/useActions";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ColorSearch: React.FC = () => {

    const res = useParams();
    const { searchedColorById } = useTypedSelector((store) => store.colorinstance);
    const [ide, setIde] = useState<number>();
    const { FetchColorById } = useActions();

    async function getColors(search: ISearchItem) {

        try {
            await FetchColorById(search);

        } catch (ex) {
            console.log("Error fetch in component id:", ex);

        }
    }

    useEffect(() => {

        const result=Number(res.id);
        //console.log("Res",res.id);
        setIde(result);
        const search: ISearchItem = {
            id: result
        };
        getColors(search);
    }, []);


    return (
        <>
            <h1>Деталі по кольору:</h1>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Назва</th>
                </tr>
                </thead>
                <tbody>
                <tr key={searchedColorById.id}>
                    <th scope="row">{searchedColorById.id}</th>
                    <td>{searchedColorById.name}</td>
                </tr>
                
                </tbody>
            </table>
            <Link className="btn btn-info" to={'/'}>На головну</Link>

        </>
    )

}
export default ColorSearch;