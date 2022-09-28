import axios from "axios";

const apiUrl = 'http://localhost:8092/api/image/uploadMultipleFiles';

export const multipleFilesUpload = async (data: FormData) => {
    try {
        await axios.post(apiUrl, data)
    } catch (error) {
        throw error;
    }
}

