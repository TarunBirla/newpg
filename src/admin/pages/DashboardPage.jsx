import { FileText, FlameIcon, Home, Users } from "lucide-react";

const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}
        >
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Content
const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          title="Total Banners"
          value="24"
          change={12}
          icon={FlameIcon}
          color="bg-blue-500"
        />
        <StatsCard
          title="Total Posts"
          value="142"
          change={8}
          icon={FileText}
          color="bg-green-500"
        />
        <StatsCard
          title="Total Users"
          value="1,428"
          change={-3}
          icon={Users}
          color="bg-purple-500"
        />
        <StatsCard
          title="Active Sessions"
          value="89"
          change={15}
          icon={Home}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h2>
        </div>
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    User performed action #{item}
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
