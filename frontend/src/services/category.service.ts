import http from "../http-common";
import {ICategory} from "../types/type";

const getAll = () => {
    return http.get<Array<ICategory>>("/categories");
}

const get = (id: any) => {
    return http.get<ICategory>(`/categories/${id}`);
}

const create = (data: ICategory) => {
    return http.post<ICategory>("/category/add",data);
}

const update = (id: any, data: ICategory) => {
    return http.put<any>(`/categories/update/${id}`, data);
}

const remove = (id: any) => {
    return http.delete<any>(`/category/delete/${id}`)
}

export function deleteCategory(id: any) {
    return fetch(`http://localhost:8092/api/category/delete/${id}`, {method: 'DELETE'});
}

const findByTitle = (title: string) => {
    return http.get<Array<ICategory>>(`/category/searchByName?name=${title}`)
}

const CategoryService = {
    getAll,
    get,
    create,
    update,
    remove,
    deleteCategory,
    findByTitle,
};

export default CategoryService;