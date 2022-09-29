//import { ICategory } from "../../types/type"

export enum CommentActionTypes {
    FETCH_COMMENTS_SUCCES = "FETCH_COMMENTS_SUCCES",
    FETCH_COMMENTS_ERROR = "FETCH_COMMENTS_ERROR",
    ADD_COMMENT_SUCCES = "ADD_COMMENT_SUCCES",
}

export interface ICommentModel {
    id: number,
    comment: string,
    rating: number
}

export interface ISearchCommentByIdModel {
    id: number,
    comment: string,
    rating: number
}

export interface CommentState {
    comments: Array<ICommentModel>
    status: number | string
    searchedCommentById: ISearchCommentByIdModel
}

export interface IAddNewComment {
    comment: string,
    rating: number
}

export interface ISearchItem {
    id: number
}

export interface FetchSuccessCommentAction {
    type: CommentActionTypes.FETCH_COMMENTS_SUCCES;
    payload: Array<ICommentModel>;
}

export interface AddSuccessCommentAction {
    type: CommentActionTypes.ADD_COMMENT_SUCCES;
    payloads: string | number
}

// export interface FetchCategoryItemById {
//     type: CategoryActionTypes.FETCH_CATEGORY_BY_ID;
//     payload: ISearchCategoryByIdModel;
// }
//
// export interface GetCategoryAction {
//     type: CategoryActionTypes.GET_CATEGORY_BY_ID;
// }
//
// export interface GetSuccesCategoryAction {
//     type: CategoryActionTypes.GET_CATEGORY_SUCCES;
//     payload: ICategory;
// }
//
// export interface DeleteCategoryAction {
//     type: CategoryActionTypes.DELETE_CATEGORY_BY_ID;
//     payload: number;
// }
//
// export interface UpdateSuccesCategoryAction {
//     type: CategoryActionTypes.UPDATE_CATEGORY_BY_ID;
//     payload: ICategory
// }

export type CommentAction =
    FetchSuccessCommentAction
    | AddSuccessCommentAction
    | FetchSuccessCommentAction
