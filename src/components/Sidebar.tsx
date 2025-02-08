"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ChefHat, 
  ShoppingBag,
  FileText
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: '/'
    },
    {
      label: 'Products',
      icon: <ShoppingBag className="w-5 h-5" />,
      href: '/Products'
    },
    {
      label: 'Add Products',
      icon: <ChefHat className="w-5 h-5" />,
      href: '/Add-Products'
    },
    {
      label: 'Users',
      icon: <Users className="w-5 h-5" />,
      href: '/Users'
    },
    {
      label: 'Orders',
      icon: <FileText className="w-5 h-5" />,
      href: '/Orders'
    }
  ];

  return (
    <div className="flex h-screen w-64 flex-col fixed left-0 top-0 bg-white border-r">
      {/* Logo/Header */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Food Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div>
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;