import { useTypedSelector } from "../hooks/useTypedSelector";
import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { Link } from 'react-router-dom';


const ColorList: React.FC = () => {

    const { color } = useTypedSelector((store) => store.colorinstance);
    const { FetchColors, DeleteColors } = useActions();

    useEffect(() => {

        FetchColors();

    }, []);

    const handleDelete = (id: number) => {

        DeleteColors(id);
    }


    return (
        <>
            {<table className=" table table-bordered mt-5" style={{ borderColor: '#00008B' }}>
                <thead className="table-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Назва</th>
                    <th scope="col">Опції</th>
                </tr>
                </thead>
                {<tbody>
                {color.map((item) => {
                    return (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>
                                <div className="mx-5">
                                    <Link className="btn btn-info" to={`/color/${item.id}`}>Детальніше</Link>

                                    <button className="btn btn-danger ml-2" onClick={() => { handleDelete(item.id); }}>Видалити</button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>}
            </table>}

        </>
    );
};

export default ColorList;