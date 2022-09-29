import {
    CommentAction,
    CommentActionTypes,
    IAddNewComment,
    ICommentModel,
    ISearchCommentByIdModel,
    ISearchItem
} from "../Comments/types";
import {Dispatch} from "react";
import http from "../../http-common";

export const FetchComments =
    (search: any) => async (dispatch: Dispatch<CommentAction>) => {
        try {
            const response = await http.get<Array<ICommentModel>>(`/products/${search}/responses`);
            console.log(response.data);
            dispatch({
                type: CommentActionTypes.FETCH_COMMENTS_SUCCES,
                payload: response.data
            });
            return Promise.resolve();
        } catch (error) {
            console.log("Error fetch list comments: ", error);
            return Promise.reject();
        }
    };

export const AddComments =
    (productId: number, userId: number, data: IAddNewComment) => async (dispatch: Dispatch<CommentAction>) => {
        try {
            const response = await http.post<ICommentModel>(`products/${productId}/${userId}/add`, data);
            console.log(response.status);
            dispatch({
                type: CommentActionTypes.ADD_COMMENT_SUCCES,
                payloads: response.status
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error add new comment:", error);
            return Promise.reject();
        }
    }
