import { authContext } from '@/context/authContext';
import { Models } from 'appwrite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostStats from '../posts/PostStats';

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
}) => {
  const { user } = useContext(authContext);
  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post?.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`}>
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center gap-2">
                <img
                  src={post.creator?.imageUrl || '/assets/images/profile.png'}
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p>{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats userId={user?.id} post={post} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
