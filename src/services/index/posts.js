import axios from 'axios';

export const getAllPosts = async (searchKeyword = "", page = 1, limit = 1) =>{
    try {
        const {data, headers} = await axios.get(`http://localhost:5001/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`);
        console.log(data);
        console.log(headers);
        return {data, headers};
    } catch (error) {
        if(error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const getSinglePost = async ({slug}) =>{
    try {
        const {data} = await axios.get(`http://localhost:5001/api/posts/${slug}`);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

