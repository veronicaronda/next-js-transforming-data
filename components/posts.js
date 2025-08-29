"use client"
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { toggleLike } from '@/app/actions/posts';
import { useOptimistic } from 'react';

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={`/api/images/${post.image}`} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form 
            action={toggleLike.bind(null, post.id)}
            className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId)=>{
    const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId)

    if (updatedPostId === -1) {
      return prevPosts
    }

    const updatedPost = {...prevPosts[updatedPostIndex]}
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1)
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts];
    newPosts[updatedPostIndex] = updatedPost
    return newPosts
    })
    
    if(!optimisticPosts || optimisticPosts.length === 0){
      return (
        <p>There are no posts yet. Maybe sharing some?</p>
      )

      
    }
    async function updatePost(postId) {
        updateOptimisticPosts(postId)
        await toggleLike(postId)
        
      }
  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
