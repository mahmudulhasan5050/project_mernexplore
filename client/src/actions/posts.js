import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });

    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPostAxios(post);
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }

}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePostAxios(id, post)
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) =>{
    try {
        await api.deletePostAxios(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) =>{
    const user = JSON.parse(localStorage.getItem('profile'));
try {
    const { data } = await api.likePostAxios(id, user?.token)
    dispatch({ type: LIKE, payload: data });
} catch (error) {
    console.log(error);
}
}