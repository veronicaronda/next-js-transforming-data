"use server";

import { ImageSave } from "@/lib/image";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


  export async function createPost(prevState,formData){
    const title = formData.get('title')
    const image = formData.get('image') 
    const content = formData.get('content')
      
    let errors = []

    if (!title || title.trim().length === 0){
      errors.push('Title is invalid.')
    }
    if (!content || content.trim().length === 0){
      errors.push('Content is invalid.')
    }
    if (!image || image.size === 0){
      errors.push('Image is invalid.')
    }

    if (errors.length>0){
      return {errors}
    }
     const savedImg=await ImageSave(image)
    

    await storePost({
      imageUrl:savedImg ? savedImg : '',
      title,
      content,
      userId: 1
    })
     

    redirect('/feed')
  }

  export async function toggleLike(postId){
    await updatePostLikeStatus(postId, 2);
    revalidatePath('/', 'layout');
  }