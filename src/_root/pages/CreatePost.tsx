import PostForm from "@/components/forms/PostForm"

const CreatePost = () => {
  return (
    <div className='px-4 flex flex-col gap-6 py-8 pb-36 w-full'>
        <div className="flex gap-3 items-center">
          <img src="/assets/icons/gallery-add.svg" className="invert-white object-cover" alt="add-post" height={36} width={36} />
          <h2 className="text-lg md:text-2xl font-bold text-light-2">Create Post</h2>
        </div>

        <PostForm action="create" post={null!} />


    </div>
  )
}

export default CreatePost
