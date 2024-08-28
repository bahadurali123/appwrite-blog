import { Container, PostCard, Hero } from "../index";
import { useSelector } from "react-redux";

function Home() {
    const authStatus = useSelector(state => state.auth.status);
    let { status, postsData, error } = useSelector(state => state.posts);
    postsData = postsData.slice(0, 3);

    // console.log("Status: ", status, postsData, error, authStatus)

    return (
        <div className="pb-8" style={{ background: 'rgb(247 255 255)' }}>
            <Container>
                {authStatus === true ? (
                    <>
                        <Hero />
                        <section className='my-12 mx-4 flex flex-col items-center'>
                            <h4 className="my-8 text-4xl capitalize font-bold text-red-800">latest blogs</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {postsData.map((post) => (
                                    <div key={post.$id} className="">
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                ) : <div className="text-xl text-red-800 text-center">Log in first</div>}
            </Container>
        </div>
    );
};

export default Home;