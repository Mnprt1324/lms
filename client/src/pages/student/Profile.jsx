import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseCard } from "./CourseCard";
import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { functionToUpdateProfile } from "@/API/api";
import { profileSchema } from "@/validation/userValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { LoaderA } from "@/components/LoaderA";
import { useState, useRef } from "react";
import { 
  User, 
  Mail, 
  Camera, 
  GraduationCap, 
  Calendar, 
  Trophy,
  Award,
  Edit3,
  Upload,
  Loader2,
  BookOpen,
  Clock,
  Target,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Enhanced Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color = "blue", description }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 shadow-blue-100 dark:shadow-blue-900/20",
    green: "from-green-500 to-green-600 shadow-green-100 dark:shadow-green-900/20",
    purple: "from-purple-500 to-purple-600 shadow-purple-100 dark:shadow-purple-900/20",
    orange: "from-orange-500 to-orange-600 shadow-orange-100 dark:shadow-orange-900/20"
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-xl bg-gradient-to-r ${colorClasses[color]} text-white shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {label}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Achievement Badge Component
const AchievementBadge = ({ achievement, index }) => {
  const colors = [
    "from-yellow-400 to-orange-500",
    "from-blue-500 to-indigo-600",
    "from-green-500 to-emerald-600",
    "from-purple-500 to-pink-600"
  ];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${colors[index % colors.length]} text-white text-sm font-medium shadow-lg`}>
      <Trophy className="w-4 h-4" />
      {achievement}
    </div>
  );
};

// Profile Header Component
const ProfileHeader = ({ user }) => {
  const memberSince = user?.createdAt 
    ? new Date(user.createdAt).getFullYear() 
    : new Date().getFullYear();

  const completionRate = user?.enrollCourses?.length 
    ? Math.round((user?.completedCourses?.length || 0) / user.enrollCourses.length * 100)
    : 0;

  const achievements = [];
  if (user?.enrollCourses?.length >= 5) achievements.push("Course Explorer");
  if (completionRate >= 80) achievements.push("High Achiever");
  if (user?.totalHours >= 100) achievements.push("Study Master");
  if (user?.certificates?.length >= 3) achievements.push("Certified Expert");

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8 shadow-2xl">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="relative">
              <Avatar className="h-32 w-32 lg:h-40 lg:w-40 shadow-2xl border-4 border-white/30 ring-4 ring-white/10">
                <AvatarImage
                  src={user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt="User Avatar"
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl lg:text-3xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  {user?.name?.slice(0, 2).toUpperCase() || "NA"}
                </AvatarFallback>
              </Avatar>
              
              {/* Online Status Indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg"></div>
            </div>
            
            {/* Edit Button */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <EditProfileDialog user={user} />
            </div>
          </div>

          {/* User Info Section */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold mb-3 capitalize bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                {user?.name || "Unnamed User"}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/90 mb-4">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <User className="w-4 h-4" />
                  <span className="capitalize font-medium">{user?.role || "Student"}</span>
                </div>
                {user?.email && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Mail className="w-4 h-4" />
                    <span className="break-all font-medium">{user.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Member since {memberSince}</span>
                </div>
              </div>

              {/* Achievement Badges */}
              {achievements.length > 0 && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {achievements.map((achievement, index) => (
                    <AchievementBadge key={achievement} achievement={achievement} index={index} />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center lg:text-left bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">{user?.enrollCourses?.length || 0}</div>
                <div className="text-sm text-white/80 font-medium">Total Courses</div>
              </div>
              <div className="text-center lg:text-left bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">
                  {user?.completedCourses?.length || Math.floor((user?.enrollCourses?.length || 0) * 0.3)}
                </div>
                <div className="text-sm text-white/80 font-medium">Completed</div>
              </div>
              <div className="text-center lg:text-left bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">{completionRate}%</div>
                <div className="text-sm text-white/80 font-medium">Success Rate</div>
              </div>
              <div className="text-center lg:text-left bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-1">
                  {user?.totalHours || Math.floor((user?.enrollCourses?.length || 0) * 12)}h
                </div>
                <div className="text-sm text-white/80 font-medium">Study Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Edit Profile Dialog
function EditProfileDialog({ user }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      profilePhoto: undefined,
    },
  });

  const profileUpdate = useMutation({
    mutationFn: functionToUpdateProfile,
    onSuccess: (data) => {
      if (!data.data.error) {
        toast.success(data.data.message || "Profile updated successfully!");
        form.reset();
        setPreviewImage(null);
        setIsOpen(false);
        window.location.reload(); // Refresh page to show changes
      } else {
        toast.error(data.data.message || "Failed to update profile");
      }
    },
    onError: (error) => {
      console.error("Profile update error:", error);
      toast.error(error?.response?.data?.message || "Error while updating profile");
    },
  });

  const onSubmit = async (values) => {
    if (!values.name.trim()) {
      toast.error("Name is required");
      return;
    }
    const formData = new FormData();
    formData.append("name", values.name.trim());
    
    if (values.profilePhoto?.[0]) {
      formData.append("profilePhoto", values.profilePhoto[0]);
    }
    
   profileUpdate.mutate(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      form.setValue("profilePhoto", e.target.files);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePreview = () => {
    setPreviewImage(null);
    form.setValue("profilePhoto", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
          variant="outline"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <User className="w-6 h-6 text-blue-600" />
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Update your personal information and profile picture. All changes are saved instantly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <div className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
              <div className="relative group">
                <Avatar className="h-28 w-28 shadow-xl border-4 border-white dark:border-gray-600 ring-4 ring-blue-100 dark:ring-blue-900/30">
                  <AvatarImage
                    src={previewImage || user?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt="Profile Preview"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user?.name?.slice(0, 2).toUpperCase() || "NA"}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute -bottom-2 -right-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 group-hover:shadow-xl"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={triggerFileInput}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4" />
                  Upload New Photo
                </Button>
                {previewImage && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removePreview}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <FormField
                control={form.control}
                name="profilePhoto"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Enter your full name" 
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <DialogFooter className="gap-3 pt-6">
              <DialogClose asChild>
                <Button 
                  variant="outline" 
                  type="button"
                  disabled={profileUpdate.isPending}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={profileUpdate.isPending}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={form.handleSubmit(onSubmit)}
              >
                {profileUpdate.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Learning Progress Component
const LearningProgress = ({ user }) => {
  const totalCourses = user?.enrollCourses?.length || 0;
  const completedCourses = user?.completedCourses?.length || Math.floor(totalCourses * 0.3);
  const progressPercentage = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Learning Progress</h3>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {completedCourses} of {totalCourses} courses completed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        <div className="text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
          {Math.round(progressPercentage)}% Complete
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mt-6">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <BookOpen className="w-4 h-4 mr-2" />
          Continue Learning
        </Button>
        <Button variant="outline" className="flex-1">
          <Star className="w-4 h-4 mr-2" />
          View Certificates
        </Button>
      </div>
    </div>
  );
};

// Courses Section Component
const CoursesSection = ({ courses }) => {
const navigate=useNavigate();
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="mb-6">
          <GraduationCap className="w-20 h-20 mx-auto text-gray-400 mb-4" />
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
            Ready to Start Learning?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
            Discover amazing courses from expert instructors and start your learning journey today!
          </p>
        </div>
        <Button onClick={()=>navigate("/courses")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
          <BookOpen className="w-5 h-5 mr-2" />
          Browse Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <div 
          key={index} 
          className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
        >
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
};

// Main Profile Component
export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <LoaderA />;

  const enrolledCount = user?.enrollCourses?.length || 0;
  const completedCount = user?.completedCourses?.length || Math.floor(enrolledCount * 0.3);
  const certificatesCount = user?.certificates?.length || Math.floor(enrolledCount * 0.2);
  const studyHours = user?.totalHours || Math.floor(enrolledCount * 12);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Learning Progress */}
        <LearningProgress user={user} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            icon={GraduationCap}
            label="Total Courses"
            value={enrolledCount}
            color="blue"
            description="Courses enrolled"
          />
          <StatsCard 
            icon={Trophy}
            label="Completed"
            value={completedCount}
            color="green"
            description="Successfully finished"
          />
          <StatsCard 
            icon={Award}
            label="Certificates"
            value={certificatesCount}
            color="purple"
            description="Earned achievements"
          />
          <StatsCard 
            icon={Clock}
            label="Study Time"
            value={`${studyHours}h`}
            color="orange"
            description="Total learning hours"
          />
        </div>

        {/* Enrolled Courses Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Learning Journey
            </h2>
          </div>
          
          <CoursesSection courses={user?.enrollCourses} />
        </div>
      </div>
    </div>
  );
};