import axios from 'axios';

const API = axios.create({baseURL: `https://${process.env.REACT_APP_URL_MAIN}`});

//sending token to backend
API.interceptors.request.use((req)=>{
if(localStorage.getItem('profile')){
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
}
return req;
})

export const fetchPosts = () => API.get('/posts');
export const createPostAxios = (newPost) => API.post('/posts', newPost);
export const updatePostAxios = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePostAxios = (id) => API.delete(`/posts/${id}`);
export const likePostAxios = (id) => API.patch(`/posts/${id}/likePost`);

export const signInAxios = (formData) => API.post('/user/signin', formData);
export const signUpAxios = (formData) => API.post('/user/signup', formData);
