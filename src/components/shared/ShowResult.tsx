import { Models } from 'appwrite'
import Loader from './Loader'
import GridPostList from './GridPostList'

const ShowResult = ({
    searchedPosts,isSearchFetching
}:{
    isSearchFetching:boolean,
    searchedPosts?:Models.Document[]
}) => {

    if(isSearchFetching) return <Loader />
    if(searchedPosts?.length) return <GridPostList posts={searchedPosts} />
  return (
    <p className='text-light-4 mt-10 text-center w-full'> 
    no results found  
    </p>
  )
}

export default ShowResult
