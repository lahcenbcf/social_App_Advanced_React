const TimeAgo = ({ date }:{
    date:string
}) => {
    // Parse the provided date string
    const postDate = new Date(date);
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const diffInMs = currentDate - postDate;
    
    // Convert milliseconds to hours and days
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;
    
    // Determine how to display the time ago
    let timeAgo = '';
    if (diffInHours < 24) {
      timeAgo = `${Math.round(diffInHours)} hours ago`;
    } else {
      timeAgo = `${Math.round(diffInDays)} days ago`;
    }
  
    return (
      <p className="text-xs text-light-2">{timeAgo}</p>
    );
  };
  
  export default TimeAgo;