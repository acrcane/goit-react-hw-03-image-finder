import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const API_KEY = '35867052-4bc95a3fa2f6c2b76177d40b9';

export const fetchImages = async (nameImage, page) => {
  const params = new URLSearchParams({
    q: nameImage, 
    page: page, 
    key: API_KEY, 
    image_type: 'photo', 
    orientation: 'horizontal', 
    per_page: '12', 
  });

  const response = await axios.get(`${baseURL}?${params}`);
  return response.data.hits;
};