import { Link } from "react-router-dom"
import { Logo } from "../index"
function Footer() {

    return (
        <section className="relative overflow-hidden py-10 bg-cyan-50 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width={`w-48`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright 2023. All Rights Reserved by&nbsp;
                                    <Link
                                        to="https://www.linkedin.com/in/bahadurk/"
                                        target="_blank"
                                        className=" text-base text-sm text-gray-600 hover:text-cyan-400"
                                    >Bahadur Khan</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-red-800">
                                Quick Links
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-cyan-950 hover:text-cyan-400"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-cyan-950 hover:text-cyan-400"
                                        to="/all-posts"
                                    >
                                        All Posts
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-cyan-950 hover:text-cyan-400"
                                        to="/add-post"
                                    >
                                        Add Post
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-red-800">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-cyan-950 hover:text-cyan-400"
                                        to="/terms-conditions"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-cyan-950 hover:text-cyan-400"
                                        to="/privacy-policy"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;