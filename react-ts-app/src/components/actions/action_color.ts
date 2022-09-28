import {
    ColorAction,
    ColorActionTypes,
    IAddNewColor,
    IColorModel,
    ISearchColorByIdModel,
    ISearchItem,
    DeleteColorAction,
    AddColorsToProductActions
} from "../AddNewColor/types";
import {Dispatch} from "react";
import http from "../../http-common";

export const FetchColors =
    () => async (dispatch: Dispatch<ColorAction>) => {
        try {
            const response = await http.get<Array<IColorModel>>("/colors");
            console.log(response.data);
            dispatch({
                type: ColorActionTypes.FETCH_COLOR_SUCCESS,
                payload: response.data,
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error fetch list colorss :", error);
            return Promise.reject();
        }
    };


export const AddColors =
    (data: IAddNewColor) => async (dispatch: Dispatch<ColorAction>) => {
        try {
            const response = await http.post<IColorModel>("/color/add", data);
            console.log(response.status);
            dispatch({
                type: ColorActionTypes.ADD_COLOR_SUCCESS,
                payloads: response.status
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error add new color:", error);
            return Promise.reject();
        }

    }

export const FetchColorById =
    (search: ISearchItem) => async (dispatch: Dispatch<ColorAction>) => {
        try {
            const response = await http.get<ISearchColorByIdModel>(`/colors/${search.id}`);
            const {data} = response;
            console.log(response);
            dispatch({
                type: ColorActionTypes.FETCH_COLOR_BY_ID,
                payload: response.data

            });

            return Promise.resolve<ISearchColorByIdModel>(data);

        } catch (error) {

            console.log("Error fetch color by id :", error);
            return Promise.reject();

        }
    }

export const DeleteColors =
    (deleteId: number) => async (dispatch: Dispatch<DeleteColorAction>) => {
        try {
            const response = await http.delete(`/color/delete/${deleteId}`);
            console.log(response.status);
            dispatch({
                type: ColorActionTypes.DELETE_COLOR_BY_ID,
                payload: deleteId
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error delete color:", error);
            return Promise.reject();
        }

    }

export const AddColorsToProduct =
    (productId: number, data: IColorModel) => async (dispatch: Dispatch<AddColorsToProductActions>) => {
        try {
            const response = await http.post<IColorModel>("/color/add", data);
            console.log(response.status);
            dispatch({
                type: ColorActionTypes.ADD_COLORS_TO_PRODUCTS,
                payload: response.status
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error add new color:", error);
            return Promise.reject();
        }
    }

export const getAllColorsByProductId =
    (search: ISearchItem) => async (dispatch: Dispatch<ColorAction>) => {
        try {
            const response = await http.get<Array<IColorModel>>(`products/${search}/colors`);
            console.log(response.data);
            dispatch({
                type: ColorActionTypes.FETCH_COLOR_BY_PRODUCT_ID_SUCCESS,
                payload: response.data,
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error fetch list colorss :", error);
            return Promise.reject();
        }
    };


