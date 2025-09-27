"use client";
import { useEffect } from "react";
import PostCard from "../../../components/PostCard";
import { PostCardProps } from "@/type/PostCard.types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/store";
import { fetchPosts } from "@/reduxStore/postSlice";
import RightPanel from "@/components/RightPanel";
import LeftPannel from "@/components/LeftPannel";

export default function NewsFeedPage() {
  const dispatch = useAppDispatch();
  const postsPayload =
    useAppSelector((state) => state?.post?.postsPayload) || [];
  console.log("feedposts", postsPayload);
  const { items } = postsPayload || { posts: [] };

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
     <div className="pt-10 container mx-auto px-4">
      {/* Center column (wider feed) */}
       <main className="space-y-4">
        <div className="space-y-4 grid grid-cols-3 gap-4">
          {items?.map((post: PostCardProps) => (
            <PostCard key={post?.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
}
