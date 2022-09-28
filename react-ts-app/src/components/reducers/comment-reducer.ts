import {CommentState, CommentAction, CommentActionTypes} from "../Comments/types";

const initialState: CommentState = {
    comments: [],
    status: "",
    searchedCommentById: {
        id: 0,
        comment: "",
        rating: 0
    }
};

export const commentReducer = (state = initialState, action: CommentAction): CommentState => {
    switch (action.type) {

        case CommentActionTypes.FETCH_COMMENTS_SUCCES:
            return {
                ...state,
                comments: action.payload,
                status: ''
            };

        case CommentActionTypes.ADD_COMMENT_SUCCES:
            return {
                ...state,
                status: action.payloads
            };
            
        default:
            return state;
    }
}