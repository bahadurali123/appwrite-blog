import { Container, PostForm } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function EditPost() {
    const slug = useParams().slug;
    const navigate = useNavigate();

    const post = useSelector(state => state.post.postsData);
    useEffect(() => {
        if (post === null) {
            navigate(`/post/${slug}`);
        }
    }, [])

    // console.log("Post Edit data: ", post);

    return post ? (
        <div className="py-8" style={{ background: 'rgb(247 255 255)' }}>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost;