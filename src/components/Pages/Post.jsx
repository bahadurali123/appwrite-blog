import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbservice from "../../../appwrite/dbconfig.service";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { setPostReducer } from "../../store/singlePostSlice"
import { deletePostReducer } from "../../store/postslice";

export default function Post() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    const posts = useSelector(state => state.posts.postsData);
    // console.log("Posts data: ", posts);
    const postIs = posts.filter(post => post.$id === slug);
    const post = postIs[0];
    // console.log("Post data: ", post, slug, postIs, post);

    useEffect(() => {
        if (slug) {
            dispatch(setPostReducer(post));
        } else navigate("/");
    }, [slug, post])

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    const deletePost = () => {
        dbservice.deletePost(post.$id).then((status) => {
            if (status) {
                dbservice.deleteFile(post.featuredimage);
                dispatch(deletePostReducer(post.$id));
                navigate("/");
            }
        });
    };

    // console.log("Post data 3: ", post);
    return post ? (
        <div className="py-8" style={{ background: 'rgb(247 255 255)' }}>
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbservice.getFilePreview(post.featuredimage)}
                        alt={post.title}
                        className="w-full rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="mr-3 bg-cyan-400 hover:bg-cyan-500">
                                    Edit
                                </Button>
                            </Link>
                            <Button className="bg-cyan-400 hover:bg-cyan-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mx-4 mb-6">
                    <h1 className="text-2xl font-bold capitalize text-cyan-950">{post.title}</h1>
                </div>
                <div className="browser-css mx-4">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}