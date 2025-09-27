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
  //console.log("feedposts", postsPayload);
  const { posts: feedposts } = postsPayload || { posts: [] };

  useEffect(() => {
    if (feedposts.length === 0) {
      dispatch(fetchPosts());
    }
  }, []);

  return (
     <div className="pt-10 container mx-auto grid grid-cols-12 gap-4 px-4">
      <LeftPannel />
      {/* Center column (wider feed) */}
       <main className="col-span-12 lg:col-span-6 space-y-4">
        <div className="space-y-4">
          {feedposts?.map((post: PostCardProps) => (
            <PostCard key={post?.id} {...post} />
          ))}
        </div>
      </main>
      <RightPanel />
    </div>
  );
}
