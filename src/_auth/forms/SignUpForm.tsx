'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from '@/lib/react-query/queriesAndMutations';
import { useContext } from 'react';
import { authContext } from '@/context/authContext';
const formSchema = z.object({
  username: z
    .string()
    .min(6, {
      message: 'username too short',
    })
    .max(50),
  email: z.string().includes('@'),
  password: z.string().min(5, {
    message: 'password must at least 5 caracters',
  })!,
});

const SignUpForm = () => {
  const { checkAuthUser } = useContext(authContext);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const { mutateAsync: createUser, isPending } = useCreateUserAccountMutation();
  const { mutateAsync: signInAccount } = useSignInAccount();
  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await createUser(data);
    if (!(typeof result === 'object')) {
      return toast({
        title: 'registration error',
        description: result,
      });
    }

    const session = await signInAccount({
      email: data.email,
      password: data.password,
    });
    if (!session) {
      return toast({
        title: 'sign in failed',
      });
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast({
        title: 'failed to sign up',
      });
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col">
        <img src="/assets/images/logo.svg" className="object-cover scale-75" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-22 pb-6">
          create your first account
        </h2>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="max-w-sm w-full shadow-md flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="username"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@esi.dz"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*******"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {isPending ? (
            <div className="w-full bg-primary-500 py-3 flex justify-center gap-2">
              <Loader /> Loading
            </div>
          ) : (
            <Button type="submit" className="shad-button_primary">
              Submit
            </Button>
          )}
          <p className="text-sm text-light-2 text-center">
            Already have an accont ?
            <Link to={'/login'} className="text-primary-500 semibold">
              login
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </Form>
  );
};

export default SignUpForm;
