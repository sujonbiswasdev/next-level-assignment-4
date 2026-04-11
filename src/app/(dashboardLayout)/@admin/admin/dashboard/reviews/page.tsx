import { getAllreview } from '@/actions/reviews.order'
import ReviewsTable from '@/components/modules/review/ReviewTable'
import { IgetReviewData } from '@/types/reviews.type'
import React from 'react'

const ReviewsPage = async() => {
    const reviews=await getAllreview()
       if (!reviews.data || !reviews.success || reviews.error) {
    return (
      <div className="p-4 text-red-500">
        Failed to load reviews
      </div>
    );
  }
  return (
    <div>
      <ReviewsTable initialreviews={reviews.data as IgetReviewData[]}/>
    </div>
  )
}

export default ReviewsPage
