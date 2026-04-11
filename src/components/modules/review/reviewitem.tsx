import {
  deleteReviewAction,
  reviewUpdate,
} from "@/actions/reviews.order";
import ReviewForm from "@/components/modules/review/reviewform";
import { IGetMealData, MealReview } from "@/types/meals.type";
import { IUpdatereviewData } from "@/types/reviews.type";
import { TUser } from "@/types/user.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "react-toastify";

export const ReviewItem = ({
  user,
  review,
  meal,
  activeReplyId,
  setActiveReplyId,
  totalLength,
}: {
  user: TUser;
  review: MealReview;
  meal: IGetMealData;
  activeReplyId: any;
  setActiveReplyId: any;
  totalLength: number;
}) => {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);
  const [updateReview, setupdateReview] = useState<IUpdatereviewData>();
  if (meal == null || meal == undefined) {
    return <div className="p-4 text-red-500">Failed to load review</div>;
  }
  const reply=review.replies.filter((item,index)=>item.customer?.name)
  const reviewinfo=reply.find((item,index)=>item.customer?.id)
  const defaultIamge =
    "https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png";

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const toastId=toast.loading("review deleting.......")
    const res = await deleteReviewAction(review.id);
    if (res.success) {
      router.refresh();
      toast.dismiss(toastId)
      toast.success(res.message || "review deleted successfully")
    } else {
      toast.dismiss(toastId)
      toast.error(res.message || "review deleted failed");
    }
  };
  const handleupdate = async () => {
    const res = await reviewUpdate(
      review.id,
      updateReview as IUpdatereviewData,
    );

    if (res.success) {
      alert("Review updated!");
      router.refresh();
    } else {
      alert(res.message || "update failed");
    }
  };

  const reviewlength = review?.replies?.map((_, i) => i);
  return (
    <div className="border-t pt-6 mt-4 flex gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div
            className="w-12 h-12 rounded-full bg-gray-200  overflow-hidden relative"
            style={{
              backgroundImage: review.customer?.image
                ? `url(${review.customer?.image})`
                : `url(${reviewinfo?.customer?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {review.customer?.image && (
              <Image
                src={review.customer.image || reviewinfo?.customer?.image ||defaultIamge}
                alt="user"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">
              {review.customer?.name || reviewinfo?.customer?.name}
            </h4>
            <button onClick={() => handleDelete()} className="bg-red-500 rounded-sm shadow-sm px-2 py-0.5 cursor-pointer text-white">delete</button>

            {isEditing ? (
              <div>
                <div className="space-y-2 space-x-2">
                  <input
                    className="text-black border-2 px-2 focus:bg-blue-100 border-green-700 rounded-md"
                    value={updateReview?.comment}
                    type="text"
                    onChange={(e) =>
                      setupdateReview({ comment: e.target.value })
                    }
                  />
                  <button

                    onClick={() => {
                      setisEditing(false)
                      handleupdate()
                    }}
                    className="px-2 py-1 bg-blue-800 text-white rounded-sm"
                  >
                    update
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={()=>setisEditing(true)}>
                edit
              </button>
            )}
          </div>
          {review.rating && (
            <span className="text-orange-500 text-sm">
              {review.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="text-gray-600 mt-1">{review.comment}</p>

        <button
          disabled={totalLength !== reviewlength?.length}
          onClick={() =>
            setActiveReplyId(activeReplyId === review.id ? null : review.id)
          }
          className="text-sm text-blue-500 mt-2"
        >
          {totalLength !== reviewlength?.length ? "" : "reply"}
        </button>

        {activeReplyId === review.id && (
          <ReviewForm parentId={review.id} mealId={meal.id} />
        )}

        {review.replies?.length > 0 && (
          <div className="ml-8 border-l pl-4">
            {review.replies.map((reply: any) => (
              <ReviewItem
                key={reply.id}
                user={user}
                review={reply}
                meal={meal}
                activeReplyId={activeReplyId}
                setActiveReplyId={setActiveReplyId}
                totalLength={review.replies.length}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
