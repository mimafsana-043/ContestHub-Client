import axios from 'axios';
export const uploadImage = async (imageFile) => {
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
        if (response.data && response.data.data && response.data.data.url) {
            return response.data.data.url;
        } else {
            throw new Error('Image upload failed: Invalid response from imgbb');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
    
}