// components/PostCard.tsx
import { MessageCircle, Eye } from "lucide-react";
import { PostCardProps } from "../../type/PostCard.types";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({
  id,
  title,
  body,
  tags,
  comments,
  views,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden transition">
      <div className="p-4 space-y-3">
        <Link href={`/post/${id}`}>
          {" "}
          <h2 className="text-2xl font-bold hover:text-blue-600 cursor-pointer">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 text-xl line-clamp-3">{body}</p>
        <Image
          src={`https://picsum.photos/id/${id}/640/640`}
          className="w-full object-cover"
          width={300}
          height={300}
          alt={title}
        />
        {/* Tags */}
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

        {/* Footer info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {/* <span>By {user}</span> */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
