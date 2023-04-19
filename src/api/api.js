import axios from '../axios'

export const getPostPage = async( pageParam = 1, options = {} ) => {
    const response = await axios.get(`/api/photos/${pageParam}`, options)
    return response.data 
}