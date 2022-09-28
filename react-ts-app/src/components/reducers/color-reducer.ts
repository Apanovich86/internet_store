
import { ColorState, ColorAction, ColorActionTypes } from "../AddNewColor/types";

const initialState: ColorState = {

    color: [],
    status: "",
    searchedColorById: {
        id: 0,
        name: ""
    }
};

export const colorReducer = (state = initialState, action: ColorAction): ColorState => {
    switch (action.type) {

        case ColorActionTypes.FETCH_COLOR_SUCCESS:
            return {
                ...state,
                color: action.payload,
                status: ''
            };

        case ColorActionTypes.ADD_COLOR_SUCCESS:
            return {
                ...state,
                status: action.payloads
            };

        case ColorActionTypes.FETCH_COLOR_BY_ID:
            return {
                ...state,
                searchedColorById: {
                    id: action.payload.id,
                    name: action.payload.name,
                }
            };

        case ColorActionTypes.ADD_COLORS_TO_PRODUCTS:
            return {
                ...state,
                status: action.payload,
            }

        case ColorActionTypes.DELETE_COLOR_BY_ID:
            return {
                ...state,
                color:state.color.filter((item)=>item.id!==action.payload)
            };

        case ColorActionTypes.FETCH_COLOR_BY_PRODUCT_ID_SUCCESS:
            return {
                ...state,
                color: action.payload,
                status: ''
            };

        default:
            return state;
    }
};
