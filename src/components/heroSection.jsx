import { Link } from "react-router-dom";
function Hero() {
    let url = 'https://videos.pexels.com/video-files/3129576/3129576-sd_640_360_30fps.mp4';
    return (
        <section className="relative h-screen">
            <video className="object-cover w-full h-full absolute top-0 left-0 animate-fade-in" muted autoPlay loop>
                <source src={url} type="video/mp4" />
            </video>
            <div className="w-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center animate-slide-in-bottom">
                <h1 className="text-5xl font-bold animate-fade-in">Your Guide to the Future</h1>
                <p className="text-lg my-4 animate-fade-in">Stay ahead of the curve with our insightful AI blog. Discover the latest trends, breakthroughs, and best practices in artificial intelligence. From in-depth analysis to practical tips, our blog empowers you to navigate the evolving landscape of AI and harness its potential for success.</p>
                <Link
                    to="/all-posts"
                    className="bg-cyan-500 hover:bg-cyan-950 text-white font-bold py-2 px-4 rounded animate-pulse"
                >
                    All blogs
                </Link>
            </div>
        </section>
    )
}

export default Hero;