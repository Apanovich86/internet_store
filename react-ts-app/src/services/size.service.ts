import http from "../http-common";
import {ISizeModel} from '../components/AddNewColor/types';

export const getSizesInProduct = (productId: any) => {
    return http.get<Array<ISizeModel>>(`products/${productId}/sizes`);
}