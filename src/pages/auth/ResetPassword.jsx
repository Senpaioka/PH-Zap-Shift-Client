import { useForm } from "react-hook-form";
import authImg from "../../assets/images/auth.png";
import Logo from "../../components/Logo";

function ResetPassword() {
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting }, } = useForm();

  const onSubmit = async (data) => {
    console.log("Reset Password Data:", data);
    // Add your actual password reset logic here
  };

  return (

    <div className="min-h-screen flex flex-col sm:flex-row">
      
      {/* Left Section */}
      <div className="bg-white p-6 sm:p-10 md:p-20 flex-1 flex flex-col">
        <Logo />
        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h3 className="font-u-extra text-3xl sm:text-4xl md:text-5xl mb-2">Reset Password</h3>
            <p className="text-gray-600 mb-8">Reset your password</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full" noValidate>
              {/* New Password */}
              <div>
                <label htmlFor="password" className="block mb-2 font-medium">New Password</label>
                <input id="password" type="password" className="input input-bordered w-full focus:input-primary" placeholder="Enter new password"
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
                  <p className="text-red-500 text-sm mt-2" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 font-medium">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="Confirm your password" className="input input-bordered w-full focus:input-primary"
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => {
                      const { password } = getValues();
                      return value === password || "Passwords do not match";
                    },
                  })}/>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2" role="alert">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full mt-4 text-white hover:text-black disabled:opacity-50" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
              
            </form>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-[#FAFDF0] p-6 sm:p-10 md:p-20 flex-1 hidden sm:flex items-center justify-center">
        <img
          src={authImg}
          alt="Authentication illustration"
          className="max-w-full h-auto object-contain max-h-[70vh]"
        />
      </div>
    </div>
  );
}

export default ResetPassword;