import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, Select, RTE } from "../index"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import dbservice from "../../../appwrite/dbconfig.service"
import { addPostReducer, updatePostReducer } from "../../store/postslice";

function PostForm({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log("Post in Post form", post)

    // register: is used to connect input elements with the form.
    // handleSubmit: handles form submission and provides the form data to the onSubmit function.
    // watch: allows you to track changes in form field values.
    // control: is used for creating controlled input components.
    // setValue: manually sets the value of a form field.
    // getValues: retrieves all form field values as an object.
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || '',
        },
    });

    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        // When the post already exists.
        if (post) {
            const file = data.image[0] ? dbservice.uploadFile(data.image[0]) : null;
            if (file) {
                dbservice.deleteFile(post.featuredimage)
            }
            const updatedpost = await dbservice.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined
            })
            if (updatedpost) {
                // console.log("Update Response: ", updatedpost);
                dispatch(updatePostReducer(updatedpost))
                navigate(`/post/${updatedpost.$id}`)
            }
        } else {
            // If creating a new post.

            // console.log("Form Data: ", data);
            const file = data.image[0] ? await dbservice.uploadFile(data.image[0]) : "File is required";

            if (file) {
                data.featuredimage = file.$id;
                const newPost = await dbservice.createPost({
                    ...data,
                    userid: userData.$id
                })
                if (newPost) {
                    // console.log("Response: ", newPost);
                    dispatch(addPostReducer(newPost));
                    navigate(`/post/${newPost.$id}`)
                }
            }
        }
    }

    const slugTransformation = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/\s/g, '-')

        return ''
    }, [])

    // The subscription: holds the active watch on the title field.
    // The unsubscribe: function is used to stop watching when the component unmounts or dependencies change.
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug',
                    slugTransformation(value.title),
                    { shouldValidate: true })
            }
        });

        return () => {
            subscription.unsubscribe()
        }
    }, [slugTransformation, setValue, watch])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap px-4">
            <div className="md:w-2/3 sm:w-full px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransformation(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="md:w-1/3 sm:w-full px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dbservice.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full bg-cyan-400">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm