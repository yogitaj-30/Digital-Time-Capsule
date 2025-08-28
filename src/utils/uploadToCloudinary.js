import axios from 'axios'

export const uploadToCloudinary = async (files) => {
    const urls = []
    const cloudName = "dkt91wfkx";
    const uploadPreset = "my_unsigned_preset";


    for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                formData
            )
            urls.push(response.data.secure_url);
        } catch (error) {
            console.error("Cloudinary upload failed: ", error);
            return null;
        }
    }
    return urls;
}

export const uploadCoverImage = async (file) => {
    const cloudName = "dkt91wfkx";
    const uploadPreset = "cover_image";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        )
        return response.data.secure_url;
    } catch (error) {
        console.error("Cloudinary upload failed: ", error);
        return null;
    }

}