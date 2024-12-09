"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    pathname !== "/about" &&
    pathname !== "/devenir-membre" &&
    pathname !== "/dashboard" &&
    pathname !== "/login" && (
      <nav
        aria-label="navbar"
        className="flex items-center justify-between p-6 lg:px-8 h-20"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/hamdin2.jpeg"
            width={70}
            height={70}
            alt="Bassirou Hamdine Sy"
            className="h-12 w-12 object-cover object-center rounded-full"
          />
          <span className="sr-only">Bassirou Hamdine Sy</span>
          <span className="max-lg:hidden uppercase font-extrabold">
            Bassirou Hamdine Sy
          </span>
          <span className="lg:hidden flex uppercase font-extrabold">BHS</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm cursor-pointer font-semibold leading-6 text-gray7900 transition-colors hover:text-gray-900"
          >
            À propos
          </Link>
          <Link
            href="/devenir-membre"
            className="text-sm font-semibold leading-6 text-gray-700 transition-colors hover:text-gray-900"
          >
            devenir membre <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    )
  );
};

export default Navbar;