import {
    ProductAction,
    IProductModel,
    ProductsActionTypes,
    IProductSearchList,
    ISearchProduct,
    IAddNewProduct,
    ISearchItem,
    ISearchProductByIdModel,
    FetchProductByCategoryId,
    DeleteProductAction
} from "../MultiImagesProductsList/types";
import {Dispatch} from "react";
import http from "../../http-common";
import axios, {AxiosError} from "axios";
import ProductService from "../../services/product.service";

export const fetchProductsSearch =
    (searchParams: string) => async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await ProductService.findByTitle(searchParams);

            dispatch({
                type: ProductsActionTypes.SEARCH_PRODUCTS,
                payload: response.data,
            });

            return Promise.resolve();
        } catch (error) {
            return Promise.reject();
        }
    }

export const fetchProducts = () => async (dispatch: Dispatch<ProductAction>) => {

    try {
        const response = await http.get<Array<IProductModel>>("/products");
        console.log(response.data);
        dispatch({
            type: ProductsActionTypes.FETCH_PRODUCT_SUCCESS,
            payload: response.data,
        });
        return Promise.resolve();
    } catch (error) {
        console.log("Error fetch list products:", error)
        return Promise.reject(error);

    }
}

export const addProducts =
    (data: IAddNewProduct) => async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.post<IProductModel>("/products/add", data);
            console.log(response.status);
            dispatch({
                type: ProductsActionTypes.ADD_PRODUCT_SUCCESS,
                payloads: response.status
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error add new product:", error);
            return Promise.reject();
        }

    }

export const FetchProductById =
    (search: ISearchItem) => async (dispatch: Dispatch<ProductAction>) => {
        try {
            const response = await http.get<ISearchProductByIdModel>(`/products/${search.id}`);
            const {data} = response;
            console.log(response.data);
            dispatch({
                type: ProductsActionTypes.FETCH_PRODUCT_BY_ID,
                payload: response.data

            });

            return Promise.resolve<ISearchProductByIdModel>(data);

        } catch (error) {

            console.log("Error fetch product by id :", error);
            return Promise.reject();

        }
    }

export const DeleteProducts =
    (deleteId: number) => async (dispatch: Dispatch<DeleteProductAction>) => {
        try {
            const response = await http.delete(`/products/${deleteId}`);
            console.log(response.status);
            dispatch({
                type: ProductsActionTypes.DELETE_PRODUCT_BY_ID,
                payload: deleteId
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error delete product:", error);
            return Promise.reject();
        }

    }

export const getProductsByCategoryId =
    (categoryId: ISearchItem) => async (dispatch: Dispatch<ProductAction>) => {
    try {
        const response = await http.get<Array<IProductModel>>(`/categories/${categoryId}/products`);
        const {data} = response;
        console.log(response.data);
        dispatch({
            type: ProductsActionTypes.FETCH_PRODUCT_BY_CATEGORY_ID,
            payload: response.data

        });

        return Promise.resolve();

    } catch (error) {

        console.log("Error fetch product by categoryId :", error);
        return Promise.reject();

    }
}