import { Container, PostCard } from "../index"
import { useSelector } from "react-redux";


function AllPosts() {
    const { postsData } = useSelector(state => state.posts);
    // console.log("Data in All posts: ", postsData);

    return (
        <div className="py-8" style={{ background: 'rgb(247 255 255)' }}>
            <Container>
                <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postsData.map((post) => (
                        <div key={post.$id}
                            className="bg-white rounded-lg shadow-md overflow-hidden">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts;