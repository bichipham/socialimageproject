"use client";

import PostCard from "@/components/PostCard";
import { PostCardProps } from "@/type/PostCard.types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") ?? "";

  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      setPosts([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    fetch(`https://dummyjson.com/posts/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setTotal(data.total || 0);
      })
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-lg">Loading...</h1>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src="https://group.beincom.com/_next/static/media/not_suggest_community.99771c28.png"
          alt="No Results"
          width={200}
          height={200}
        />
        <h1>No results found for: {query}</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl p-2 mb-2">{total} result</h1>
      <div className="space-y-4">
        {posts?.map((post: PostCardProps) => (
          <PostCard key={post?.id} {...post} />
        ))}
      </div>
    </div>
  );
}


export default function SearchWrapper() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}