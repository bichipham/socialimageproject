import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { map } from "lodash-es";
import { Comment, ListComment, PostCardProps } from "@/type/PostCard.types";
import UserAvatar from "@/components/UserAvatar";
import CommentList from "@/components/CommentList";

// Fetch dữ liệu
async function getPost(id: string): Promise<PostCardProps> {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params
  const post = (await getPost(id)) || [];
  const { title = "", body = "", tags, user, views = "" } = post || {};

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Nội dung Post */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <Image
          src={`https://picsum.photos/id/${id}/640/640`}
          alt={title}
          className="w-full object-cover"
          width={640}
          height={640}
        />
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>By Bichi</span>
            <span>{views} views</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{body}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div> 
      <CommentList postId={id} />
    </div>
  );
}

