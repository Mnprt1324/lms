// components/AuthTabs.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { functionToSignup } from "../API/api";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, signupSchema } from "@/validation/userValidation";
import { toast } from "sonner";
import { useLoginUser } from "@/hooks/useLoginUser";
import { Loader } from "@/components/ui/Loader";

export function Login() {
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, loginMutation } = useLoginUser(loginForm);
  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data) => {
    loginMutation(data);
  };

  const onSignupSubmit = async (data) => {
    signupMutation.mutate(data);
  };

  const signupMutation = useMutation({
    mutationFn: functionToSignup,
    onSuccess: (data) => {
      if (!data.data.error) {
        toast.success(data.data.message);
      }
      signupForm.reset();
    },
    onError: (error) => {
      toast.error(error.response.data.message || error.response.data.errors[0]);
    },
  });

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative flex items-center justify-center bg-slate-100  overflow-hidden">
        <div className="block absolute inset-0 z-0 md:hidden">
          <img
            src="/login.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Content */}
        <div className="relative z-10 w-full max-w-md  backdrop-blur-md rounded-xl md:bg-white shadow-lg p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4 border-0 rounded-lg overflow-hidden shadow-lg bg-transparent">
              <TabsTrigger
                value="signup"
                className="text-sm font-medium py-2 transition-colors duration-200
               data-[state=active]:bg-transparent md:data-[state=active]:bg-slate-100 
               data-[state=active]:text-black cursor-pointer
                focus:border focus:border-black md:focus:border-0 md:focus:border-black"
              >
                Sign Up
              </TabsTrigger>
              <TabsTrigger
                value="login"
                className="text-sm font-medium py-2 transition-colors duration-200
               data-[state=active]:bg-transparent md:data-[state=active]:bg-slate-100 
               data-[state=active]:text-black cursor-pointer
                focus:border focus:border-black md:focus:border-0 md:focus:border-black"
              >
                Login
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <Card className="shadow-none bg-transparent border-0 md:bg-white ">
                    <CardHeader>
                      <CardTitle>Login</CardTitle>
                      <CardDescription>Welcome back!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className=" border  border-[#555f4A] md:border focus:ring-0 focus:ring-blue-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">
                        {isPending ? <Loader /> : "Login"}
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
                  <Card className="shadow-none bg-transparent border-0">
                    <CardHeader>
                      <CardTitle>Sign Up</CardTitle>
                      <CardDescription>Create a new account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="******"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">
                        Sign Up
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Side Image (optional) */}
      <div className="hidden md:block w-full h-full">
        <img
          src="/login.png"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
