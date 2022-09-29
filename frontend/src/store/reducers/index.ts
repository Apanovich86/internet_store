import { combineReducers } from "redux";
import { categoryReducer } from "../../components/reducers/category-reducers";
import { colorReducer } from "../../components/reducers/color-reducer";
import { productReducer } from "../../components/reducers/product-reducer";
import { commentReducer } from "../../components/reducers/comment-reducer";
import { cartReducer } from "../../components/reducers/cart-reducers";

export const rootReducer = combineReducers({
    categoryinstance: categoryReducer,
    colorinstance: colorReducer,
    productinstance: productReducer,
    commentinstance: commentReducer,
    cartinstance: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>