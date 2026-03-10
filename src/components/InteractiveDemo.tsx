import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  ListTodo,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: ListTodo },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const stats = [
  { label: "Active Projects", value: "12", change: "+3", icon: TrendingUp },
  { label: "Team Members", value: "8", change: "+2", icon: Users },
  { label: "Tasks Completed", value: "147", change: "+24", icon: CheckCircle2 },
  { label: "Hours Tracked", value: "892", change: "+48", icon: Clock },
];

const tasks = [
  { title: "Design system updates", status: "completed", priority: "high" },
  { title: "API endpoint optimization", status: "in-progress", priority: "high" },
  { title: "User authentication flow", status: "in-progress", priority: "medium" },
  { title: "Database migration scripts", status: "todo", priority: "medium" },
  { title: "Performance monitoring setup", status: "todo", priority: "low" },
];

const statusColors: Record<string, string> = {
  completed: "bg-emerald-500/20 text-emerald-400",
  "in-progress": "bg-amber-500/20 text-amber-400",
  todo: "bg-muted text-muted-foreground",
};

const priorityDots: Record<string, string> = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-muted-foreground",
};

const chartData = [35, 52, 41, 68, 59, 82, 71, 93, 65, 78, 88, 95];

const InteractiveDemo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section id="demo" className="section-padding" ref={ref}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-primary code-font mb-3">// interactive demo</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Interactive <span className="gradient-text">Project Demo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a simulated productivity dashboard — click around!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card-static overflow-hidden gradient-border"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground code-font">
                app.dashboard.dev
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 relative ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={15} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="demo-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors cursor-default"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon size={16} className="text-muted-foreground" />
                          <span className="text-xs text-emerald-400 code-font">{stat.change}</span>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mini chart */}
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-sm font-medium mb-4">Weekly Activity</p>
                  <div className="flex items-end gap-2 h-24">
                    {chartData.map((val, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                        className="flex-1 rounded-t-sm"
                        style={{ background: "var(--gradient-primary)", opacity: 0.4 + (val / 100) * 0.6 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "tasks" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {tasks.map((task, i) => (
                  <motion.div
                    key={task.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className={`w-2 h-2 rounded-full ${priorityDots[task.priority]}`} />
                    <span className="flex-1 text-sm">{task.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Completion Rate", value: "87%", sub: "vs 72% last month" },
                  { label: "Avg. Task Time", value: "2.4h", sub: "vs 3.1h last month" },
                  { label: "Team Velocity", value: "34 pts", sub: "+12% this sprint" },
                  { label: "Code Coverage", value: "92%", sub: "Above threshold" },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-5 rounded-lg bg-muted/30 border border-border/50 text-center"
                  >
                    <p className="text-3xl font-bold gradient-text mb-1">{metric.value}</p>
                    <p className="text-sm font-medium mb-1">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.sub}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 max-w-md"
              >
                {[
                  { label: "Email Notifications", enabled: true },
                  { label: "Dark Mode", enabled: true },
                  { label: "Auto-save", enabled: true },
                  { label: "Analytics Tracking", enabled: false },
                ].map((setting, i) => (
                  <motion.div
                    key={setting.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <span className="text-sm">{setting.label}</span>
                    <div
                      className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                        setting.enabled ? "bg-primary/30" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                          setting.enabled ? "left-5 bg-primary" : "left-1 bg-muted-foreground"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
