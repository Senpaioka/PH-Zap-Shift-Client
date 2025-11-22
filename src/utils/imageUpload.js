
const IMG_BB_KEY = import.meta.env.VITE_IMGBB_KEY;


async function uploadImage(data) {

    try {
        let imageURL = null;

        // checking user upload image or not
        if(data.image && data.image.length > 0) {
            const file = data.image[0];

            // prepare data for upload
            const formData = new FormData();
            formData.append("image", file);

            // upload to imgBB
            const uploadImg = await fetch(`https://api.imgbb.com/1/upload?key=${IMG_BB_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const result = await uploadImg.json();

             if (result.success) {
                imageURL = result.data.url; // 👈 Final hosted URL
            } else {
                throw new Error("Image upload failed.");
            }
        }
        
        return imageURL; // url or null
        
    }
    catch(error){
        console.log(error.message);
        throw error;
    }
}

export {uploadImage};