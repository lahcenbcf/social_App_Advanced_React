import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/Loader';
import ShowResult from '@/components/shared/ShowResult';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import {
  useGetInfinitePost,
  useSearchPost,
} from '@/lib/react-query/queriesAndMutations';
import { useState } from 'react';

const Explore = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: posts, fetchNextPage, hasNextPage } = useGetInfinitePost();
  const { data: searchedPosts, isFetching: isLoading } =
    useSearchPost(debouncedValue);
  const shouldShowResult = searchValue != '';
  let shouldShowPosts;
  if (posts?.pages.length) {
    shouldShowPosts =
      !shouldShowResult &&
      posts.pages.every((item) => item?.documents?.length === 0);
  }

  if (!posts?.pages.length) return <Loader />;

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" width={36} height={36} />
          <Input
            type="text"
            value={searchValue}
            placeholder="search"
            className="explore-search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-6">
        <h2 className="body-bold md:h3-bold">Popular Today</h2>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-meduim md:base-meduim">All</p>
          <img
            src="assets/icons/filter.svg"
            width={20}
            height={20}
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowResult ? (
          <ShowResult
            isSearchFetching={isLoading}
            searchedPosts={searchedPosts!}
          />
        ) : shouldShowPosts ? (
          <p className="text-lght mt-10 text-center w-full">End of posts</p>
        ) : (
          posts?.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents!} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
