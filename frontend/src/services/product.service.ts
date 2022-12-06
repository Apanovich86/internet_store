import http from "../http-common";
import {IProduct} from "../types/type";
import {IProductModel} from "../components/Products/types";

const getAll = () => {
    return http.get<Array<IProduct>>("/product/products");
}

const get = (id: string) => {
    return http.get<IProduct>(`/product/products/${id}`);
}

const create = (data: IProduct) => {
    return http.post<IProduct>("/product/add", data)
}

const findByTitle = (title: string) => {
    return http.get<Array<IProductModel>>(`/products?title=${title}`);
};

const getProductsByCategoryId = (categoryId: number) => {
    return http.get<Array<IProductModel>>(`/categories/${categoryId}/products`);
}

const ProductService = {
    getAll,
    get,
    create,
    findByTitle,
    getProductsByCategoryId,
}

export default ProductService;