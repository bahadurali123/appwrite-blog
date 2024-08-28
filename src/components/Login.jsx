import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../store/authslice"
import { Button, Input, Logo } from "./index";
import authService from "../../appwrite/auth.service";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        setError("");
        // console.log("Hook Form Data is: ", data);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                }
                navigate("/");
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full my-24'
        >
            <div className={`mx-auto w-full max-w-lg bg-cyan-50 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-cyan-950">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 text-center mt-8">{error}</p>}
                <form onSubmit={handleSubmit(login)}
                    className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matctpatern: (value) => {
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Enter valid Email address"
                                    }
                                }
                            })} />
                        <Input
                            label="Password: "
                            placeholder="Enter password"
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 8,
                            })} />
                        <Button
                            type="submit"
                            className="w-full bg-cyan-400 hover:bg-cyan-500"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login