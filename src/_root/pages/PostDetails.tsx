import PostStats from '@/components/posts/PostStats';
import Loader from '@/components/shared/Loader';
import TimeAgo from '@/components/shared/TimeAgo';
import { Button } from '@/components/ui/button';
import { authContext } from '@/context/authContext';
import {
  deletePostMutation,
  useUniquePost,
} from '@/lib/react-query/queriesAndMutations';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PostDetails = () => {
  const { user } = useContext(authContext);
  const { mutateAsync: deletePost } = deletePostMutation();
  const { id } = useParams();
  const { data: postInfo, isPending } = useUniquePost(id!);
  const navigate = useNavigate();
  const deleteP = async () => {
    await deletePost(postInfo?.$id!);
    navigate('/');
  };
  if (isPending) return <Loader />;
  return (
    <div className="post_details-container">
      <img
        src={postInfo?.imageUrl}
        alt="post"
        className="post_details-img w-full object-cover"
      />
      <div className="post_details-info w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${postInfo?.creator.$id}`}>
              <img
                src={
                  postInfo?.creator?.imageUrl || '/assets/images/profile.png'
                }
                height={35}
                width={35}
                className="rounded-full object-cover"
              />
            </Link>
            <div className="flex flex-col">
              <p className="font-bold text-white">
                {postInfo?.creator.username}
              </p>
              <TimeAgo date={postInfo?.$createdAt!} />

              <p className="font-semibold text-light-3 text-xs">
                {postInfo?.location}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              to={`/update-postInfo/${postInfo?.$id}`}
              className={`${user?.id !== postInfo?.creator.$id && 'hidden'}`}
            >
              <img src="/assets/icons/edit.svg" height={20} width={20} />
            </Link>
            {/* delete post */}
            <Button
              onClick={deleteP}
              variant={'ghost'}
              className={`ghost_details-delete_btn ${
                postInfo?.creator?.$id != user?.id && 'hidden'
              }`}
            >
              <img
                src="/assets/icons/delete.svg"
                width={24}
                height={24}
                className="object-cover"
              />
            </Button>
          </div>
        </div>

        <hr className="border w-full border-dark-4/60" />
        <div className="flex flex-col mt-4">
          <h2 className="text-white">{postInfo?.caption}</h2>
          <ul>
            {postInfo?.tags.map((tag: string) => (
              <span className="text-light-3 pb-2">{'#' + tag}</span>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <PostStats userId={user?.id} post={postInfo!} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
