import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router';
import { useState, useRef } from 'react';
import {useAuth} from '../../hooks/useAuth';
import authImg from '../../assets/images/auth.png';
import uploadImg from '../../assets/icons/image-upload-icon.png';
import Logo from '../../components/Logo';

function Register() {
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const {authenticateWithGoogle} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  // gmail authentication
  async function registerWithGoogle() {
    try {
      const result = await authenticateWithGoogle();
      if(result?.user) {
        navigate(location.state || '/');
      }
    }
    catch (error) {
      console.log(error.message, error);
    }
  }

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Add your registration logic here
    // Example: await registerUser(data);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  
  return (

    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left Section */}
      <div className="bg-white p-6 sm:p-10 md:p-20 flex-1 flex flex-col">
        <Logo></Logo>
        
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-2">Create an Account</h3>
            <p className="text-gray-600 mb-8">Register with ZapShift</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full" noValidate>
              {/* Image Upload */}
              <div className="flex flex-col items-center">
                <input type="file" id="imageUpload" accept="image/*" className="hidden"
                  {...register("image", {
                    validate: {
                      fileType: (files) => {
                        if (!files || files.length === 0) return true; // Optional field
                        const file = files[0];
                        return file.type.startsWith("image/") || "Please select an image file";
                      },
                      fileSize: (files) => {
                        if (!files || files.length === 0) return true; // Optional field
                        const file = files[0];
                        return file.size <= 5 * 1024 * 1024 || "Image size should be less than 5MB";
                      },
                    },
                  })}
                  onChange={handleImageChange}
                  ref={fileInputRef}/>
                
                <label htmlFor="imageUpload" className="cursor-pointer w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center hover:border-primary transition-colors">
                  
                  {previewImage ? (
                    <div className="relative w-full h-full">
                      <img src={previewImage} alt="Profile preview" className="w-full h-full rounded-full object-cover"/>
                      <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">×</button>
                    </div>
                  ) : (
                    <img src={uploadImg} alt="Upload profile" className="w-12 h-12 opacity-80"/>
                  )}
                </label>
                
                <p className="text-sm text-gray-500 mt-2">
                  Click to upload profile photo
                </p>
                
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
                <input id="name" type="text" className="input input-bordered w-full focus:input-primary" placeholder="Enter your full name" aria-invalid={errors.name ? "true" : "false"}
                  {...register("name", { 
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}/>

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                <input id="email" type="email" className="input input-bordered w-full focus:input-primary" placeholder="Enter your email"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { 
                      value: /\S+@\S+\.\S+/, 
                      message: "Please enter a valid email address" 
                    }
                  })}/>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                <input id="password" type="password" className="input input-bordered w-full focus:input-primary" placeholder="Create a password"
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:'",.<>/?]).{6,}$/,
                      message:
                        "Password must include at least 1 uppercase letter, 1 number, and 1 special character",
                    },
                  })}/>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.password.message}
                  </p>
                )}
                
                {/* Password Requirements */}
                <div className="mt-2 text-xs text-gray-600">
                  <p>Password must contain:</p>
                  <ul className="list-disc list-inside ml-2">
                    <li>At least 6 characters</li>
                    <li>1 uppercase letter</li>
                    <li>1 number</li>
                    <li>1 special character</li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full mt-4 text-white hover:text-black disabled:opacity-50" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6">
              Already have an account?{' '}
              <Link 
                to='/auth' 
                className="text-primary hover:text-primary-focus font-medium transition-colors">
                Login here
              </Link>
            </p>
            
            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">Or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            {/* Google Sign Up */}
            <button 
              onClick={registerWithGoogle}
              className="btn bg-base-300 text-black border-gray-300 w-full hover:bg-gray-200 transition-colors"
              type="button"
            >
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-[#FAFDF0] p-6 sm:p-10 md:p-20 flex-1 hidden sm:flex items-center justify-center">
        <img 
          src={authImg} 
          alt="Authentication illustration" 
          className="max-w-full h-auto object-contain max-h-[70vh]" />
      </div>
    </div>
  );
}

export default Register;

