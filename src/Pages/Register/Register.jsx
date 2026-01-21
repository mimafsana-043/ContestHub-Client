import { getAuth, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { uploadImage } from "../../Utils/index"; // adjust path if needed

const Register = () => {
  const { createUser, setUser, googleSignIn, updateUserProfile } = useContext(AuthContext);
  const {register, handleSubmit, formState: { errors } } = useForm();
 

  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (formData) => {
    const name = formData.name.trim();
    const email = formData.email.trim();      
    const password = formData.password;
    const photoUrlInput = formData.photoUrl?.trim() || "";
    const photoFile = formData.photoFile?.[0];

    // 🔹 Name validation
    if (name.length < 6) {
      setNameError("Name must be at least 6 characters long");
      return;
    } else {
      setNameError("");
    }

    // 🔹 Password validation
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;
    if (!passRegex.test(password)) {
      setPassError(
        "Password must be at least 6 characters long and contain one uppercase letter and one special character."
      );
      return;
    } else {
      setPassError("");
    }

    try {
      let photoURL = "";

      // ✅ If file selected → upload to imgbb
      if (photoFile) {
        photoURL = await uploadImage(photoFile);
      }
      // ✅ If URL provided → use directly
      else if (photoUrlInput) {
        photoURL = photoUrlInput;
      }
      // ❌ Neither provided
      else {
        Swal.fire({
          icon: "error",
          title: "Image Required",
          text: "Please upload an image or provide an image URL.",
        });
        return;
      }

      // 🔹 Create user
      const result = await createUser(email, password);
      const user = result.user;

      // 🔹 Update profile with name and photo
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      // Reload user to get updated profile
      await user.reload();
      
      // Force auth state change to trigger the listener
      const auth = getAuth();
      await auth.updateCurrentUser(auth.currentUser);

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been created successfully.",
      });

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Logged in with Google successfully!",
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col justify-center items-center w-96"
      >
        <h1 className="font-semibold text-2xl mb-3 mt-5">Register</h1>

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your name"
          />
          {nameError && <p className="text-error">{nameError}</p>}

          {/* Email */}
          <label className="label mt-2">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />

          {/* Password */}
          <label className="label mt-2">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
              className="input w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {passError && <p className="text-error">{passError}</p>}

          {/* Image URL */}
          <label className="label mt-2">Photo URL (optional)</label>
          <input
            type="url"
            {...register("photoUrl")}
            className="input w-full"
            placeholder="Paste image URL"
          />

          {/* Image File */}
          <label className="label mt-2">Upload Photo (optional)</label>
          <input
            type="file"
            {...register("photoFile")}
            className="file-input file-input-bordered w-full"
            accept="image/*"
          />

          <p className="text-sm text-gray-500 mt-1">
            Upload an image or paste a public image URL
          </p>

          <button className="btn btn-neutral mt-4 w-full">
            Register
          </button>

          <p className="mt-2 text-center">
            Already have an account?
            <Link to="/login">
              <span className="text-red-600 ml-1">Login</span>
            </Link>
          </p>
        </fieldset>

        <div className="w-full h-0.5 bg-gray-300 mt-4"></div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border w-full rounded-md mt-4"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
