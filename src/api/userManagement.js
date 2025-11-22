import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
import {uploadImage} from '../utils/imageUpload';


// manual user registration
async function userRegistrationRequest(user_data) {

    if (!user_data) return;

    let imgURL = null;
    if (user_data.image && user_data.image.length > 0) {
        imgURL = await uploadImage(user_data);

    }

    try {
         
        const response = await axios.post(`${BASE_URL}/registration`, 
            {
                displayName: user_data.name,
                email: user_data.email,
                photoURL:  imgURL,
                password: user_data.password,
                emailVerified: false,                 
            },
            {
                 headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return response.data;
    }
    catch(error) {
        console.error("Error Registering User", error);
        throw new Error("Unsuccessful !!!", error.message);
    }

}


// manual user login




export {userRegistrationRequest, }