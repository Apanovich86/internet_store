import http from "../http-common";
import {IColorModel} from '../components/AddNewColor/types';
import {IProductModel} from "../components/Products/types";

export const createColorsInProduct = (productId: any, data: IColorModel | undefined) => {
    return http.post<IColorModel>(`products/${productId}/colors`, data);
}

export const getColorsInProduct = (productId: any) => {
    return http.get<Array<IColorModel>>(`products/${productId}/colors`);
}

const getAll = () => {
    return http.get<Array<IColorModel>>("/colors");
}

const getProductsByColorId = (colorId: number) => {
    return http.get<Array<IProductModel>>(`/colors/${colorId}/products`);
}
const ColorService = {
    createColorsInProduct,
    getAll,
    getProductsByColorId,
};

export default ColorService;