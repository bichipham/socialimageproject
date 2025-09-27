"use client";
import { MessageCircle } from "lucide-react";
import { map } from "lodash";
import { Comment } from "@/type/PostCard.types";
import UserAvatar from "@/components/UserAvatar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxStore/store";
import { addComment, fetchCommentsByPostId } from "@/reduxStore/commentSlice";

const CommentList = ({ postId }: { postId: string }) => {
  const dispatch = useAppDispatch();
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const user = useAppSelector((state) => state?.auth?.user) || {
    username: "",
    id: "",
  };

  useEffect(() => {
    const fetchComments = async () => {
      const res = await dispatch(fetchCommentsByPostId(postId));
      if (res?.type === "comments/fetchCommentsByPostId/fulfilled") {
        setLocalComments(res?.payload);
      }
    };
    fetchComments();
  }, [dispatch, postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const res = await dispatch(
      addComment({ postId, body: newComment, userId: user?.id })
    ).unwrap();
    setLocalComments((prev) => [...prev, res]);
    setNewComment("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
      {/* Header */}
      <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
        <MessageCircle className="w-5 h-5 text-blue-500" />
        Comments{" "}
        <span className="text-gray-500 text-sm">({localComments?.length})</span>
      </h2>

      {/* Input add comment */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full transition"
        >
          Post
        </button>
      </div>

      {/* Comment list */}
      <div className="space-y-4">
        {localComments?.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No comments yet</p>
        ) : (
          map(localComments, (cmt: Comment) => (
            <div
              key={cmt.id}
              className="flex items-start gap-3 bg-gray-50 rounded-xl p-3"
            >
              <UserAvatar
                name={cmt.user.fullName}
                size={40}
                bg="rgba(99,102,241,0.18)"
                color="#3b82f6"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-800">
                  {cmt?.user?.fullName}
                </p>
                <p className="text-gray-700 text-sm leading-snug">
                  {cmt?.body}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentList;
