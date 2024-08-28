import dbservice from "../../appwrite/dbconfig.service";
import { Link } from "react-router-dom"

function PostCard({ $id, title, featuredimage }) {
    return (
        <Link to={`/post/${$id}`} className="grid bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <img src={dbservice.getFilePreview(featuredimage)}
                alt={title}
                className="w-full h-48 object-cover" />
            <div className='p-4'>
                <h2 className="text-lg capitalize font-bold text-cyan-950">{title}</h2>
            </div>
        </Link>
    )
};

export default PostCard;