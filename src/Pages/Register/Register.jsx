import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from "../../Provider/AuthProvider";


const Register = () => {
    const { createUser, setUser } = useContext(AuthContext);
    const [nameError, setNameError] = useState("");
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { googleSignIn } = useContext(AuthContext);
    const [passError, setPassError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        if (name.length < 6) {
            setNameError("Name must be at least 6 characters long");
            return;
        } else {
            setNameError("");
        }
        const email = form.email.value;
        const password = form.password.value;
        const passRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;
        if (!passRegex.test(password)) {
            setPassError("Password must be at least 6 characters long and contain at least one uppercase letter and one special character.");
            return;
        } else {
            setPassError("");
        }


        const photo = form.photo.value;
        // console.log({ name, email, password, photo });
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setUser(user);

                // Success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Account Created!',
                    text: 'Your account has been created successfully.',
                    confirmButtonText: 'OK'
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                });
            });




        console.log(name, email, password, photo);
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                // console.log("Google User:", user);
                Swal.fire({
                    title: "Your account has been created successfully.",
                    width: 600,
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(/images/trees.png)",
                    backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
                });
                navigate(from, { replace: true });
            })
            .catch((error) => console.error(error.message));
    }
    return (
        <div>
            <div className=" flex flex-col justify-center items-center">
                <form onSubmit={handleRegister} className="flex flex-col justify-center items-center w-96 ">
                    <h1 className="font-semibold text-2xl mb-3 mt-5">Register</h1>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">


                        <label className="label">Name</label>
                        <input type="text" className="input" name="name"
                            placeholder="Name"
                            required
                        />
                        {nameError && <p className="text-md text-error">{nameError}</p>}

                        <label className="label">Email</label>
                        <input type="email" className="input" name="email" placeholder="Email"
                            required
                        />

                        <label className="label">Password</label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input w-full pr-10"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500 hover:text-indigo-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {passError && <p className="text-md text-error">{passError}</p>}



                        <label className="label">Photo URL</label>
                        <input type="url" className="input" name="photo"
                            placeholder="Photo URL"
                            required
                        />

                        <button className="btn btn-neutral mt-4">Register</button>
                        <p className="mt-2 text-center">Already have an account?<Link to={'/Login'}><span className="text-red-600"> Login</span></Link></p>
                    </fieldset>

                    <div className="w-96 h-0.5 bg-gray-300  mt-4"></div>

                    <button type="button" className="btn bg-white text-black border-[#e5e5e5] w-80 rounded-md mt-4" onClick={handleGoogleLogin}>
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                </form>


            </div>
        </div>


    );
};

export default Register;