import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import TimeAgo from '../shared/TimeAgo';
import { useContext } from 'react';
import { authContext } from '@/context/authContext';
import PostStats from './PostStats';

type PostCardProps = {
  post: Models.Document;
};
const PostCard = ({ post }: PostCardProps) => {
  const { user } = useContext(authContext);
  return (
    <div className="rounded-md max-w-md w-full bg-dark-4 p-4">
      <div className="flex-between">
        <div className="flex items-center gap-2">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={post.creator?.imageUrl || '/assets/images/profile.png'}
              height={35}
              width={35}
              className="rounded-full object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <p className="font-bold text-white">{post.creator.username}</p>
            <TimeAgo date={post.$createdAt} />

            <p className="font-semibold text-light-3 text-xs">
              {post.location}
            </p>
          </div>
        </div>

        <Link
          to={`/update-post/${post?.$id}`}
          className={`${user?.id !== post.creator.$id && 'hidden'}`}
        >
          <img src="/assets/icons/edit.svg" height={20} width={20} />
        </Link>
      </div>
      <Link to={`/post/${post.$id}`}>
        <div className="flex flex-col mt-4">
          <h2 className="text-white">{post.caption}</h2>
          <ul>
            {post.tags.map((tag: string) => (
              <span className="text-light-3 pb-2">{'#' + tag}</span>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl}
          alt="post-image"
          className="h-64 rounded-md w-full object-center"
        />
      </Link>

      {/* card actionq */}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
