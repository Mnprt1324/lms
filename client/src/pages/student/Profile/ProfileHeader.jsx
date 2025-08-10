export const ProfileHeader = ({ user }) => {
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