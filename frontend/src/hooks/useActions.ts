import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import CategoryActionCreators from "../store/action-creators";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(CategoryActionCreators, dispatch);
}