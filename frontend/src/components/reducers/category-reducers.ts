import {CategoryState, CategoryAction, CategoryActionTypes} from "../CategoryList/types";

const initialState: CategoryState = {
    category: [],
    status: "",
    searchedCategoryById: {
        id: 0,
        name: ""
    }
};

export const categoryReducer = (state = initialState, action: CategoryAction): CategoryState => {
    switch (action.type) {

        case CategoryActionTypes.FETCH_CATEGORY_SUCCES:
            return {
                ...state,
                category: action.payload,
                status: ''
            };

        case CategoryActionTypes.ADD_CATEGORY_SUCCES:
            return {
                ...state,
                status: action.payloads
            };

        case CategoryActionTypes.GET_CATEGORY_BY_ID:
            return {
                ...state,
             status: ''
            };

        case CategoryActionTypes.FETCH_CATEGORY_BY_ID:
            return {
                ...state,
                searchedCategoryById: {
                    id: action.payload.id,
                    name: action.payload.name
                }
            };

        case CategoryActionTypes.DELETE_CATEGORY_BY_ID:
            return {
                ...state,
                category: state.category.filter((item) => item.id !== action.payload)
            };

        case CategoryActionTypes.UPDATE_CATEGORY_BY_ID:
            return {
                ...state,
                category: state.category.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            ...action.payload.id,
                        };
                    } else {
                        return item;
                    }
                })
            };

        default:
            return state;
    }
}