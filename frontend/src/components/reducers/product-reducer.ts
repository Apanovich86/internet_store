import {ProductState, ProductAction, ProductsActionTypes} from "../Products/types";

const initialState: ProductState = {
    products: [],
    status: "",
    searchedProductById: {
        id: 0,
        title: "",
        price: 0,
        description: "",
        categoryId: 0,
        urlImage: "",
        colors: [],
        availability: false
    }
};

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
    switch (action.type) {
        
        case ProductsActionTypes.FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload,
                status: ''
            };

        case ProductsActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                status: action.payloads
            };

        case ProductsActionTypes.FETCH_PRODUCT_BY_ID:
            return {
                ...state,
                searchedProductById: {
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    description: action.payload.description,
                    categoryId: action.payload.categoryId,
                    urlImage: action.payload.urlImage,
                    colors: action.payload.colors,
                    availability: action.payload.availability
                }
            };

        case ProductsActionTypes.DELETE_PRODUCT_BY_ID:
            return {
                ...state,
                products: state.products.filter((item) => item.id !== action.payload)
            };

        default:
            return state;
    }

}