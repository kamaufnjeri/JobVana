import axios from "axios";
import { toast } from "react-toastify";

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';
const cloudinaryUrl =  process.env.NEXT_PUBLIC_CLOUDINARY_URL || '';
const apiKey =  process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ''

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);  // The file to be uploaded
    formData.append('upload_preset', uploadPreset);  // Use the ML preset
    formData.append('folder', 'jobvana');  // Specify the folder name here
    formData.append('api_key', apiKey);
    formData.append("resource_type", "raw");
  
    console.log('Uploading to:', cloudinaryUrl);
  
    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Doc URL:', response.data.secure_url); // Get the file URL after successful upload
      return response.data.secure_url; // You can use this URL in your app
  } catch (error) {
    console.log('Error uploading image:', error);
    toast.error(JSON.stringify(error))
    throw error;
  }
};