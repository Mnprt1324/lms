import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { useLoginUser } from '@/hooks/useLoginUser';
import { useUserSignUp } from '@/hooks/useUserSignUp';
import { Loader } from '@/components/ui/Loader';

export function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {loginMutation,isError,isPending}= useLoginUser();
 const {signMutation,loading}=useUserSignUp()
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const onLoginSubmit = async (data) => {
    loginMutation(data);
  };

  const onSignupSubmit = async (data) => {
    signMutation(data);
  };

  const InputField = ({ icon: Icon, type = "text", placeholder, field, error, showPasswordToggle, onTogglePassword, passwordVisible }) => (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200">
        <Icon size={20} />
      </div>
      <input
        {...field}
        type={showPasswordToggle && passwordVisible ? "text" : type}
        placeholder={placeholder}
        className={`w-full pl-12 pr-12 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-400 focus:bg-white/20 transition-all duration-300 outline-none backdrop-blur-sm ${error ? 'border-red-400' : ''}`}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {error && (
        <p className="mt-2 text-red-300 text-sm flex items-center gap-1">
          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
          {error.message}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 ">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-md mx-6">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-4">
                <Sparkles className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeTab === "login" ? "Welcome Back" : "Join Us"}
              </h1>
              <p className="text-gray-300">
                {activeTab === "login" ? "Sign in to your account" : "Create your new account"}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex mb-8 p-1 bg-white/5 rounded-2xl border border-white/10">
              {["login", "signup"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg transform scale-105"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="relative">
              {/* Login Form */}
              <div className={`transition-all duration-500 ${activeTab === "login" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 absolute inset-0 pointer-events-none"}`}>
                <div className="space-y-6">
                  <InputField
                    icon={Mail}
                    type="email"
                    placeholder="Enter your email"
                    field={loginForm.register("email")}
                    error={loginForm.formState.errors.email}
                  />
                  
                  <InputField
                    icon={Lock}
                    type="password"
                    placeholder="Enter your password"
                    field={loginForm.register("password")}
                    error={loginForm.formState.errors.password}
                    showPasswordToggle={true}
                    passwordVisible={showPassword.loginPassword}
                    onTogglePassword={() => togglePasswordVisibility("loginPassword")}
                  />

                  <button
                    onClick={loginForm.handleSubmit(onLoginSubmit)}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader /> : (
                      <>
                        Sign In
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Signup Form */}
              <div className={`transition-all duration-500 ${activeTab === "signup" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 absolute inset-0 pointer-events-none"}`}>
                <div className="space-y-6">
                  <InputField
                    icon={User}
                    placeholder="Enter your name"
                    field={signupForm.register("name")}
                    error={signupForm.formState.errors.name}
                  />
                  
                  <InputField
                    icon={Mail}
                    type="email"
                    placeholder="Enter your email"
                    field={signupForm.register("email")}
                    error={signupForm.formState.errors.email}
                  />
                  
                  <InputField
                    icon={Lock}
                    type="password"
                    placeholder="Create a password"
                    field={signupForm.register("password")}
                    error={signupForm.formState.errors.password}
                    showPasswordToggle={true}
                    passwordVisible={showPassword.signupPassword}
                    onTogglePassword={() => togglePasswordVisibility("signupPassword")}
                  />

                  <button
                    onClick={signupForm.handleSubmit(onSignupSubmit)}
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading? <Loader /> : (
                      <>
                        Create Account
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  {activeTab === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}