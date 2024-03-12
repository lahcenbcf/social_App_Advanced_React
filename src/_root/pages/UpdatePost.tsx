import PostForm from '@/components/forms/PostForm';
import Loader from '@/components/shared/Loader';
import { useUniquePost } from '@/lib/react-query/queriesAndMutations';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const { data: postInfo, isLoading } = useUniquePost(id!);

  if (isLoading) return <Loader />;

  return (
    <div className="px-4 flex flex-col gap-6 py-8 pb-36 w-full">
      <div className="flex gap-3 items-center">
        <img
          src="/assets/icons/gallery-add.svg"
          className="invert-white object-cover"
          alt="add-post"
          height={36}
          width={36}
        />
        <h2 className="text-lg md:text-2xl font-bold text-light-2">
          Edit Post
        </h2>
      </div>

      <PostForm action={'update'} post={postInfo!} />
    </div>
  );
};

export default EditPost;
