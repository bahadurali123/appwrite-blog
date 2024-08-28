import { Container, PostForm } from "../index"

function AddPost() {
    return (
        <div className="py-8" style={{ background: 'rgb(247 255 255)' }}>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost