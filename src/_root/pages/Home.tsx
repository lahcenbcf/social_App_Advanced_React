import PostCard from '@/components/posts/PostCard';
import Loader from '@/components/shared/Loader';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';

const Home = () => {
  const { data: posts, isPending, isError } = useGetRecentPosts();
  console.log(posts);
  return (
    <div className="flex flex-1 pb-32">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="font-bold text-xl self-start">Home Feed</h2>

          {isPending ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents?.length ? (
                posts?.documents.map((post) => (
                  <li className="text-red">
                    <PostCard post={post} />
                  </li>
                ))
              ) : (
                <p className="text-base text-light-2">something go wrong</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
