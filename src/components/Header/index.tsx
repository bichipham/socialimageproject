"use client";
import { Search } from "lucide-react";
import debounce from "lodash/debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "../UserMenu";

const HeaderContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("query") ?? "");

  const updateQuery = useCallback(
    debounce((value: string) => {
      if (!value.trim()) return;

      if (pathname === "/search") {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("query", value);
        router.replace(`/search?${newParams.toString()}`);
      } else {
        router.push(`/search?query=${encodeURIComponent(value)}`);
      }
    }, 500),
    [pathname, router, searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    updateQuery(e.target.value);
  };
  return (
    <header className="sticky top-0 bg-white shadow flex items-center justify-between px-6 py-3 z-50">
      <Link className="font-bold text-lg cursor-pointer" href={"/newsfeed"}>
        <Image
          src="https://group.beincom.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_beincomm_icon_only.12cfcb79.webp&w=64&q=75"
          alt="Logo"
          width={30}
          height={30}
          className="inline-block mr-2"
        />
        MySocial
      </Link>

      <div className="flex-1 max-w-md mx-6">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1"
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="rounded-full bg-gray-200 p-2">
        <UserMenu />
      </button>
    </header>
  );
};



export default function Header() {
  return (
    <Suspense fallback={<div className="h-14 bg-white shadow" />}>
      <HeaderContent />
    </Suspense>
  );
}
