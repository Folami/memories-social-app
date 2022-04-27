import axios from 'axios';

const API = axios.create({  baseURL: 'http://localhost:5000' });
//const url = 'http://localhost:5000/posts';

// middleware requests interceptor
API.interceptors.request.use((req) => {
    // sends the token with every request back to the server for verification
    if (localStorage.getItem('profile')) {
        const parsedToken = JSON.parse(localStorage.getItem('profile')).token;
        req.headers.Authorization  = `Bearer ${parsedToken}`;
    }
    return req;
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => {
    API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
}
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
//
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);