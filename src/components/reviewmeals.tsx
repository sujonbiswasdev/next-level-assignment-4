"use client";

import { useEffect, useState } from "react";
import ReviewForm from "./modules/review/reviewform";
import { Star } from "lucide-react";

export default function MealReviews({ mealId }: { mealId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    const res = await fetch(
      `http://localhost:5000/api/meals/${mealId}`
    );
    const data = await res.json();
    if (data.success) setReviews(data.data.reviews);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleNewReview = (newReview: any) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const mainReviews = reviews.filter((r) => !r.parentId);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6 mt-10">
      <h2 className="text-2xl font-bold">
        Comments ({mainReviews.length})
      </h2>

      <ReviewForm mealId={mealId} onSuccess={handleNewReview} />

      <div className="space-y-6">
        {mainReviews.map((review) => (
          <div key={review.id} className="border-t pt-6">
            <div className="flex items-center gap-3">
              <img
                src={
                  review.user?.image ||
                  "https://i.pravatar.cc/40"
                }
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">
                  {review.user?.name || "Anonymous"}
                </h4>
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <p className="mt-3 text-gray-600">
              {review.comment}
            </p>

            {/* Replies */}
            <div className="ml-12 mt-4 space-y-4">
              {reviews
                .filter((r) => r.parentId === review.id)
                .map((reply) => (
                  <div key={reply.id}>
                    <p className="text-sm text-gray-600">
                      {reply.comment}
                    </p>
                  </div>
                ))}

              <ReviewForm
                mealId={mealId}
                parentId={review.id}
                onSuccess={handleNewReview}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}