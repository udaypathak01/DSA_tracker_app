import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Sidebar Component
 * Navigation sidebar with active route indication
 */
function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/topics', label: 'Topics', icon: '📚' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-white dark:bg-dark-card border-r border-slate-200 dark:border-dark-border flex-col p-6">
      {/* Navigation Links */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                className={`px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-border'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-slate-200 dark:border-dark-border pt-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          DSA Tracker Pro v1.0
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
