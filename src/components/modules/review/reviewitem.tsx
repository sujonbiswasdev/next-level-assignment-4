import { deleteReviewAction, moderateReviewAction, reviewUpdate } from "@/actions/reviews"
import ReviewForm from "@/components/modules/review/reviewform"
import { ModerateData } from "@/services/review"
import { MealData, MealReview } from "@/types/meals/mealstype"
import { User } from "@/types/user/user"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"


export const ReviewItem = ({
  review,
  meal,
  activeReplyId,
  setActiveReplyId,
  totalLength
}: {
  review: MealReview,
  meal: MealData,
  activeReplyId: any,
  setActiveReplyId: any,
  totalLength: number
}) => {
  const router = useRouter()
  console.log(meal.provider.image, 'res')
  const [comment,setcomment]=useState<{comment:string}>({comment:""})
  if (meal == null || meal == undefined) {
    return (
      <div className="p-4 text-red-500">
        Failed to load meal
      </div>
    );
  }

  const defaultIamge = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png'


  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    const res = await deleteReviewAction(review.id);
    if (res.success) {
      alert("Review deleted!");
      router.refresh()

    } else {
      alert(res.message);
    }
  };


  const handleModerate = async (status: "APPROVED" | "REJECTED") => {

    const res = await moderateReviewAction(review.id, { status } as ModerateData);

    if (res.success) {
      alert("Review updated!");
      router.refresh()
    } else {
      alert(res.message);
    }
  };

    const handleupdate = async () => {

    const res = await reviewUpdate(review.id, comment.comment);
    console.log(res,'resdata')

    if (res.success) {
      alert("Review updated!");
      router.refresh()
    } else {
      alert(res.message);
    }
  };

  const reviewlength = review?.replies?.map((_, i) => i)
  return (
    <div className="border-t pt-6 mt-4 flex gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-200  overflow-hidden relative" style={{
            backgroundImage: meal.provider.image
              ? `url(${meal.provider.user.image})`
              : `url(${defaultIamge})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            {review.customer?.image && (
              <Image
                src={review.customer.image}
                alt="user"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">
              {review.customer?.name || (meal.provider.user.name)}
            </h4>
            <button onClick={() => handleDelete()}>
              delete
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => handleModerate("APPROVED")}
            >
              Approve
            </button>
            <input value={comment.comment} type="text" onChange={(e)=>setcomment({comment:e.target.value})} />
            <button onClick={()=>handleupdate()}>update</button>

            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={() => handleModerate("REJECTED")}
            >
              Reject
            </button>

          </div>
          {review.rating && (
            <span className="text-orange-500 text-sm">
              {review.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="text-gray-600 mt-1">
          {review.comment}
        </p>

        <button
          disabled={totalLength !== reviewlength?.length}
          onClick={() =>
            setActiveReplyId(
              activeReplyId === review.id ? null : review.id
            )
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
  )
}