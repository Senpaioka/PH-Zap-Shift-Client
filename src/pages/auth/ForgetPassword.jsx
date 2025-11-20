import { useForm } from "react-hook-form";
import { Link } from 'react-router';
import authImg from '../../assets/images/auth.png';
import Logo from '../../components/Logo';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm();

  const onSubmit = async (data) => {
    console.log("Forgot Password Data:", data);
    // Add your forgot password logic here
    // Example: await sendResetPasswordEmail(data.email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (

    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left Section */}
      <div className="bg-white p-6 sm:p-10 md:p-20 flex-1 flex flex-col">
        <Logo />
        
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-2">Forgot Password</h3>
            <p className="text-gray-600 mb-8">
              {isSubmitSuccessful 
                ? "Check your email for a reset link" 
                : "Enter your email address and we'll send you a reset link."
              }
            </p>

            {/* Success Message */}
            {isSubmitSuccessful && (
              <div className="alert alert-success mb-6 shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Reset link sent! Check your email inbox.</span>
                </div>
              </div>
            )}

            {/* Reset Form */}
            {!isSubmitSuccessful && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full"noValidate>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                  <input id="email" type="email" placeholder="Enter your email address" className="input input-bordered w-full focus:input-primary"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email address"
                      }
                    })}/>

                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary w-full mt-2 text-white hover:text-black disabled:opacity-50"
                  disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            )}

            {/* Additional Actions */}
            <div className="mt-8 space-y-4">
              {/* Back to Login */}
              <p className="text-center">
                Remember your password?{' '}
                <Link 
                  to='/auth' 
                  className="text-primary hover:text-primary-focus font-medium transition-colors">
                  Back to Login
                </Link>
              </p>

              {/* Resend Option */}
              {isSubmitSuccessful && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Didn't receive the email?
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="btn btn-ghost btn-sm text-primary">
                    Click to resend
                  </button>
                </div>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                If you don't see the email in your inbox, please check your spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-[#FAFDF0] p-6 sm:p-10 md:p-20 flex-1 hidden sm:flex items-center justify-center">
        <img 
          src={authImg} 
          alt="Password reset illustration showing secure access recovery" 
          className="max-w-full h-auto object-contain max-h-[70vh]" 
        />
      </div>
    </div>
  );
}

export default ForgotPassword;