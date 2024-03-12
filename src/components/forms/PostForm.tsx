'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import FileUploader from './FileUploader';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/lib/react-query/queriesAndMutations';
import { useContext } from 'react';
import { authContext } from '@/context/authContext';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Models } from 'appwrite';
const formSchema = z.object({
  caption: z.string().min(10, {
    message: 'enter a valid description',
  }),
  postImage: z.custom<File[]>(),
  tags: z.string(),
  location: z.string().min(2).max(40),
});

export function PostForm({
  post,
  action,
}: {
  post: Models.Document;
  action: string;
}) {
  const { user } = useContext(authContext);
  const { mutateAsync: createPost, isPending: pending1 } =
    useCreatePostMutation();
  const { mutateAsync: updatePost, isPending: pending2 } =
    useUpdatePostMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: post?.caption || '',
      tags: post?.tags ? post?.tags : '',
      location: post?.location ? post?.location : '',
      postImage: [],
    },
  });

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    //depends on the action

    if (action == 'update') {
      const updatedPost = updatePost({
        ...data,
        id: post?.$id,
        creator: user?.id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });
      if (!updatedPost)
        return toast({
          title: 'something went wrong',
        });

      navigate(`/posts/${post?.$id}`);
    } else {
      const newPost = await createPost({
        ...data,
        creator: user?.id,
      });
      if (!newPost) {
        return toast({
          title: 'something went wrong',
        });
      }
      navigate('/');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col gap-4 max-w-4xl w-full"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="caption"
                  className="shad-textarea"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUploader
                  change={field.onChange}
                  mediaUrl={post && post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="js,react ..."
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="location"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {pending1 ? (
          <div className="bg-primary-500 rounded-md px-6 py-2 text-white">
            create ...
          </div>
        ) : pending2 ? (
          <div className="bg-primary-500 rounded-md px-6 py-2 text-white">
            create ...
          </div>
        ) : action != 'update' ? (
          <Button type="submit" className="shad-button_primary">
            create post
          </Button>
        ) : (
          <Button type="submit" className="shad-button_primary">
            edit post
          </Button>
        )}
      </form>
    </Form>
  );
}

export default PostForm;
