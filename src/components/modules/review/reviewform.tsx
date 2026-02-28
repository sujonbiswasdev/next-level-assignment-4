"use client";
import { useState } from "react";
import { Star, Send } from "lucide-react";
import { createReviewAction } from "@/actions/reviews";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  mealId: string;
  parentId?: string | null;
  onSuccess?: (review: any) => void;
}

export default function ReviewForm({
  mealId,
  parentId,
  onSuccess,
}: Props) {
  const router=useRouter()
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if(rating===0){
    toast.warning("rating must be 1 digit")
    return
  }
    const data = {
      rating:rating,
      comment:comment,
      parentId:parentId
    };
    const res = await createReviewAction(mealId, data);
    console.log(res,'sdjkfsdf')

    if (!res.success) {
       toast.error( res.message||"Failed to add review");
       return
    } 
    toast.success("Review added successfully");
    router.refresh()
    setComment("")
    setRating(0)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-2xl shadow-md space-y-4"
    >
      {/* Star Rating */}
      {(
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={22}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`cursor-pointer transition ${
                (hover || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Comment Box */}
      <div className="relative">
        <textarea
          placeholder={
            parentId ? "Write a reply..." : "Write your comment..."
          }
          className="w-full border rounded-xl p-3 pr-12 resize-none focus:ring-2 focus:ring-orange-400 outline-none"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button
          type="submit"
          className="absolute right-3 bottom-3 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition"
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
}