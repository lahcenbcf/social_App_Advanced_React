import {
  useDeleteSavePost,
  useGetUserInfo,
  useLikePost,
  useSavePost,
} from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likedPosts = post?.likes.map((user: Models.Document) => user?.$id);
  const { data: user } = useGetUserInfo();

  const [savedPost,setSavedPost]=useState<Models.Document | null>(null)
  const [likes, setLikes] = useState(likedPosts);
  const [isSaved, setIsSaved] = useState(false);
  const { mutateAsync: likePost } = useLikePost();
  const { mutateAsync: savePost } = useSavePost();
  const { mutateAsync: deleteSavedPost } = useDeleteSavePost();

  const handlelikePost = async (postId: string) => {
    //e.stopPropagation()
    //this is in case when you put teh wrapper of PostStats clickable in our case no
    const newLikesArr = likedPosts.includes(userId)
      ? likedPosts.filter((like: string) => like != userId)
      : [...likedPosts, userId];
      setLikes(newLikesArr)
    const result = await likePost({ postId, likedPosts: newLikesArr });
    if (!result) throw Error;
  };

  const handleSavePost = () => {
    console.log("called from savePost")
    console.log(isSaved)
    if (isSaved) {
      setIsSaved(false);
      console.log(savedPost?.$id)
      deleteSavedPost(savedPost?.$id!);
      return;
    }
    setIsSaved(true)
    savePost({ userId, postId: post?.$id });
  };



 
  const checkIsLiked = (likes: string[], userId: string) =>
    Boolean(likes.find((l) => l == userId));
   
  useEffect(()=>{
    const savedPostFound = user?.saves?.find((save:Models.Document)=>save?.post == post.$id)
    if(savedPostFound){
      setIsSaved(true)
      setSavedPost(savedPostFound)
    }
  },[user?.$id])

  console.log(user)

  return (
    <div className="flex justify-between place-items-center mt-3">
      <div className="flex gap-2 items-center">
        <img
          src={`${
            checkIsLiked! ? '/assets/icons/liked.svg' : '/assets/icons/like.svg'
          } `}
          width={20}
          height={20}
          onClick={() => handlelikePost(post.$id)}
          className="cursor-pointer"
        />
        <p className="small-meduim lg:base-meduim">{likes.length}</p>
      </div>
      <div className="flex gap-2 items-center">
        <img
          src={`${
            isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'
          }`}
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
