import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from "../../hooks/useAuth";
import authImg from '../../assets/images/auth.png';
import Logo from '../../components/Logo';



function Login() {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const {authenticateWithGoogle} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  // gmail authentication
  async function loginWithGoogle() {
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
    console.log("Login Data:", data);
    // Add your login logic here
    // Example: await loginUser(data);
  };



  return (

    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left Section */}
      <div className="bg-white p-6 sm:p-10 md:p-20 flex-1 flex flex-col">
        <Logo />
        
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-2">Welcome Back</h3>
            <p className="text-gray-600 mb-8">Login with ZapShift</p>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full" noValidate>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                <input id="email" type="email" placeholder="Enter your email" className="input input-bordered w-full focus:input-primary"
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

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block font-medium">Password</label>
                  <Link 
                    to="/auth/forget-password" 
                    className="link link-hover text-sm text-black hover:text-black-focus">
                    Forgot password?
                  </Link>
                </div>

                <input 
                  id="password" type="password" placeholder="Enter your password" className="input input-bordered w-full focus:input-primary"
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password is required"
                    }
                  })}/>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-full mt-2 text-white hover:text-black disabled:opacity-50"
                disabled={isSubmitting}>
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Registration Link */}
            <p className="text-center mt-6">
              Don't have an account?{' '}
              <Link 
                to='/auth/register' 
                className="text-primary hover:text-primary-focus font-medium transition-colors">
                Create account
              </Link>
            </p>
            
            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">Or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            {/* Google Login Button */}
            <button 
              onClick={loginWithGoogle}
              className="btn bg-base-300 text-black border-gray-300 w-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
              type="button"
            >
              <svg 
                aria-label="Google logo" 
                width="18" 
                height="18" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Continue with Google
            </button>

            {/* Additional Help Text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                By continuing, you agree to ZapShift's{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-[#FAFDF0] p-6 sm:p-10 md:p-20 flex-1 hidden sm:flex items-center justify-center">
        <img 
          src={authImg} 
          alt="Authentication illustration showing secure login process" 
          className="max-w-full h-auto object-contain max-h-[70vh]" 
        />
      </div>
    </div>
  );
}

export default Login;