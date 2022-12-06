import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {useActions} from "../../../hooks/useActions";
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {ISearchItem, ISearchProductByIdModel} from '../../Products/types';

const CommentsList: React.FC = () => {

    const res = useParams();
    const searchedProductById = useTypedSelector((store) => store.productinstance.searchedProductById);
    const [ide, setIde] = useState<number>();
    const {FetchProductById} = useActions();
    const {comments} = useTypedSelector((store) => store.commentinstance);
    const {FetchComments} = useActions();

    async function getProducts(search: ISearchItem) {
        try {
            const data = await FetchProductById(search);
        } catch (ex) {
            console.log("Error fetch in component id:", ex);
        }
    }

    async function getCommentsByProductId() {
        FetchComments(res.id);
    }

    useEffect(() => {
        const result = Number(res.id);
        setIde(result);
        console.log("result", result);
        const search: ISearchItem = {
            id: result
        };
        getProducts(search);
        console.log(res.id);
        getCommentsByProductId();
        console.log(localStorage.getItem('user'));
    }, []);

    return (
        <>
            <div className="m30">
                {<table className=" table table-bordered mt-5 mb200" style={{borderColor: '#00008B'}}>
                    <thead className="table-dark">
                    {/*<tr className="border-r">*/}
                    {/*    <th scope="col">Коментарі</th>*/}
                    {/*</tr>*/}
                    </thead>
                    {<tbody>
                    {comments.map((item) => {
                       
                        return (
                            <tr key={item.id} className="borderComment">
                                <td ><div><i className="fa fa-user" aria-hidden="true"></i> Anna</div>{item.comment}</td>
                            </tr>
                        );
                    })}
                    </tbody>}
                </table>}
            </div>
        </>
    );
};

export default CommentsList;