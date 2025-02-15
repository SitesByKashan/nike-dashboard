// "use client"
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   Users, 
//   CopyPlus, 
//   ShoppingBag,
//   ListOrdered
// } from 'lucide-react';

// const Sidebar = () => {
//   const pathname = usePathname();

//   const navItems = [
//     {
//       label: 'Dashboard',
//       icon: <LayoutDashboard className="w-5 h-5" />,
//       href: '/'
//     },
//     {
//       label: 'Add Products',
//       icon: <CopyPlus className="w-5 h-5" />,
//       href: '/Add-Products'
//     },
//     {
//       label: 'Products',
//       icon: <ShoppingBag className="w-5 h-5" />,
//       href: '/Products'
//     }, 
//     {
//       label: 'Orders',
//       icon: <ListOrdered className="w-5 h-5" />,
//       href: '/Orders'
//     },
//     {
//       label: 'Users',
//       icon: <Users className="w-5 h-5" />,
//       href: '/Users'
//     }
//   ];

//   return (
//     <div className="flex h-screen w-64 flex-col fixed left-0 top-0 bg-white border-r">
//       {/* Logo/Header */}
//       <div className="p-6 border-b flex">
//         <Image 
//         src="/assets/Nike.png"
//         width={50}
//         height={50}
//         alt="Nike"
//         />
//         <h1 className="text-4xl font-bold">Nike</h1>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto p-4">
//         <ul className="space-y-2">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
            
//             return (
//               <li key={item.href}>
//                 <Link 
//                   href={item.href}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
//                     ${isActive 
//                       ? 'bg-blue-50 text-blue-600' 
//                       : 'text-gray-600 hover:bg-gray-50'
//                     }`}
//                 >
//                   {item.icon}
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t">
//         <div className="flex items-center gap-3 px-4 py-3">
//           <div className="w-8 h-8 rounded-full bg-gray-200">
//           <Image 
//         src="/assets/Nike.png"
//         width={50}
//         height={50}
//         alt="Nike"
//         />
//           </div>
//           <div>
//             <p className="font-medium text-sm">Admin User</p>
//             <p className="text-xs text-gray-500">admin@example.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CopyPlus,
  ShoppingBag,
  ListOrdered,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/" },
  { label: "Add Products", icon: <CopyPlus className="w-5 h-5" />, href: "/Add-Products" },
  { label: "Products", icon: <ShoppingBag className="w-5 h-5" />, href: "/Products" },
  { label: "Orders", icon: <ListOrdered className="w-5 h-5" />, href: "/Orders" },
  { label: "Users", icon: <Users className="w-5 h-5" />, href: "/Users" }
];

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="lg:hidden fixed w-full left-0 bg-white p-6 flex items-center justify-between z-50">
          <Menu className="w-6 h-6 ml-4" />
          <div className="flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2">
            <Image src="/assets/Nike.png" width={50} height={50} alt="Nike" />
            <h1 className="text-2xl font-bold">Nike</h1>
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 max-w-[16rem]">
          <SidebarContent pathname={pathname} closeSidebar={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-white border-r overflow-hidden">
        <SidebarContent pathname={pathname} />
      </div>
    </>
  );
};

const SidebarContent = ({ pathname, closeSidebar }: { pathname: string; closeSidebar?: () => void }) => (
  <div className="bg-white h-screen flex flex-col">
    {/* Logo/Header */}
    <div className="p-6 border-b flex items-center gap-3">
      <Image src="/assets/Nike.png" width={50} height={50} alt="Nike" />
      <h1 className="text-2xl font-bold">Nike</h1>
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
                  ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-100"}
                `}
                onClick={closeSidebar} // Close sidebar on navigation
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>

    {/* Fixed Footer */}
    <div className="p-4 border-t mt-auto">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
          <Image src="/assets/Nike.png" width={50} height={50} alt="Nike" />
        </div>
        <div>
          <p className="font-medium text-sm">Admin User</p>
          <p className="text-xs text-gray-500">admin@example.com</p>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
