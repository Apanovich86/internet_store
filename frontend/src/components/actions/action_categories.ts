import {
    CategoryAction,
    CategoryActionTypes,
    IAddNewCategory,
    IUpdateItem,
    ICategoryModel,
    ISearchCategoryByIdModel,
    ISearchItem,
    DeleteCategoryAction,
    UpdateSuccesCategoryAction
} from "../CategoryList/types";
import {Dispatch} from "react";
import http from "../../http-common";
import {ICategory} from "../../types/type";

export const FetchCategories =
    () => async (dispatch: Dispatch<CategoryAction>) => {
        try {
            const response = await http.get<Array<ICategoryModel>>("/categories");
            console.log(response.data);
            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORY_SUCCES,
                payload: response.data
            });
            return Promise.resolve();
        } catch (error) {
            console.log("Error fetch list categories: ", error);
            return Promise.reject();
        }
    };

export const AddCategories =
    (data: IAddNewCategory) => async (dispatch: Dispatch<CategoryAction>) => {
        try {
            const response = await http.post<ICategoryModel>("/categories/add", data);
            console.log(response.status);
            dispatch({
                type: CategoryActionTypes.ADD_CATEGORY_SUCCES,
                payloads: response.status
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error add new category:", error);
            return Promise.reject();
        }

    }

export const FetchCategoryById =
    (search: ISearchItem) => async (dispatch: Dispatch<CategoryAction>) => {
        try {
            const response = await http.get<ISearchCategoryByIdModel>(`/categories/${search.id}`);
            const {data} = response;
            console.log(response);
            dispatch({
                type: CategoryActionTypes.FETCH_CATEGORY_BY_ID,
                payload: response.data

            });

            return Promise.resolve<ISearchCategoryByIdModel>(data);

        } catch (error) {

            console.log("Error fetch category by id :", error);
            return Promise.reject();

        }
    }

export const getCategoryById = (id: number): any => {
    return async (dispatch: Dispatch<CategoryAction>) => {
        try {
            dispatch({
                type: CategoryActionTypes.GET_CATEGORY_BY_ID,
            });
            const response = await http.get<ICategory>(`categories/${id}`);
            const {data} = response;
            dispatch({
                type: CategoryActionTypes.GET_CATEGORY_SUCCES,
                payload: data,
            });

            return Promise.resolve<ICategory>({...data});
        } catch (error) {
            console.log("Error get category:", error);
            return Promise.reject();
        }
    }
}

export const DeleteCategories =
    (deleteId: number) => async (dispatch: Dispatch<DeleteCategoryAction>) => {
        try {
            const response = await http.delete(`/categories/delete/${deleteId}`);
            console.log(response.status);
            dispatch({
                type: CategoryActionTypes.DELETE_CATEGORY_BY_ID,
                payload: deleteId
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error delete category:", error);
            return Promise.reject();
        }

    }

export const UpdateCategory = (id: number, data: ICategory) => async (dispatch: Dispatch<UpdateSuccesCategoryAction>) => {
    try {
        const response = await http.put<ICategoryModel>(`/categories/update/${id}`, data);

        dispatch({
            type: CategoryActionTypes.UPDATE_CATEGORY_BY_ID,
            payload: data,
        });

        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}
