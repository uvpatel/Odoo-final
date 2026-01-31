// import Image from "next/image";
// import { Check } from "lucide-react";

// const features = [
//   "60 Premium Web Screens",
//   "Light & Dark Version",
//   "Design System Included",
//   "User Friendly Modern Layout",
//   "Free Font Used",
//   "Organized Layer & Artboard",
// ];

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden bg-[#6F5AF6] text-white">
//       <div className="mx-auto max-w-7xl px-6 py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

//           {/* LEFT CONTENT */}
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//               HR Control <br />
//               Management <br />
//               Admin UI Kit
//             </h1>

//             <ul className="mt-8 space-y-3">
//               {features.map((item) => (
//                 <li key={item} className="flex items-center gap-3">
//                   <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#6F5AF6]">
//                     <Check size={14} />
//                   </span>
//                   <span className="text-sm md:text-base">{item}</span>
//                 </li>
//               ))}
//             </ul>

//             {/* Figma badge */}
//             <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#6F5AF6]">
//               <span className="font-semibold">Figma</span>
//               <span className="opacity-70">60 Editable Screens</span>
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative hidden lg:block">
//             <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-2xl bg-black/10" />
//             <Image
//               src="/hero.png"
//               alt="Admin Dashboard Preview"
//               width={900}
//               height={600}
//               className="relative rounded-2xl shadow-2xl"
//               priority
//             />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

import React from 'react';
import { Check } from 'lucide-react';

export default function HeroSection() {
  const features = [
    '60 Premium Web Screens',
    'Light & Dark Version',
    'Design System Included',
    'User Friendly Modern Layout',
    'Free Font Used',
    'Organized Layer & Artboard'
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-600 via-purple-500 to-indigo-600 overflow-hidden">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                HR Control Management
                <span className="block mt-2">Admin UI Kit</span>
              </h1>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-purple-600" strokeWidth={3} />
                  </div>
                  <span className="text-lg font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-5 py-2 bg-white text-purple-600 rounded-full text-sm font-semibold flex items-center">
                ⭐ Figma
              </span>
              <span className="px-5 py-2 bg-purple-400 bg-opacity-30 backdrop-blur-sm text-white rounded-full text-sm font-semibold border border-white border-opacity-20">
                60 Editable Screens
              </span>
            </div>
          </div>

          {/* Right Content - Mockup Screens */}
          <div className="relative">
            {/* Dashboard Screen 1 */}
            <div className="absolute top-0 right-0 w-80 bg-white rounded-2xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      H
                    </div>
                    <span className="font-semibold text-gray-800">DevFlow</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-12 bg-linear-to-r from-purple-100 to-purple-50 rounded-lg"></div>
                  <div className="h-24 bg-linear-to-br from-blue-50 to-purple-50 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-purple-50 rounded-lg"></div>
                    <div className="h-16 bg-blue-50 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Screen 2 */}
            <div className="relative w-80 bg-white rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 mt-12">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-gray-300 rounded"></div>
                      <div className="h-2 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-24 bg-gray-300 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-32 bg-linear-to-br from-orange-100 via-purple-100 to-blue-100 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-purple-200 to-transparent"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-12 bg-purple-100 rounded"></div>
                    <div className="h-12 bg-blue-100 rounded"></div>
                    <div className="h-12 bg-orange-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Screen 3 */}
            <div className="absolute bottom-0 left-0 w-72 bg-white rounded-2xl shadow-2xl transform -rotate-6 hover:-rotate-3 transition-transform duration-300">
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-purple-600 rounded-full"></div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-gray-800 rounded"></div>
                    <div className="h-2 w-24 bg-gray-300 rounded"></div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 pt-2">
                    {[...Array(35)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-8 rounded ${
                          i % 7 === 0 || i % 7 === 6
                            ? 'bg-gray-100'
                            : i === 15
                            ? 'bg-purple-600'
                            : 'bg-gray-50'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative gradient circles */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}