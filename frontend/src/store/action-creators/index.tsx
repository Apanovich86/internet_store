import * as CategoryListAction from "../../components/actions/action_categories";
import * as ColorListAction from "../../components/actions/action_color";
import * as ProductListAction from "../../components/actions/action_product";
import * as CommentListAction from "../../components/actions/action_comments";

const actions = {
    ...CategoryListAction,
    ...ColorListAction,
    ...ProductListAction,
    ...CommentListAction
}

export default actions;