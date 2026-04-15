import { getAllreview } from '@/actions/reviews.order';
import MyReviewsTable from '@/components/modules/review/ReviewTable';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { getSession } from '@/services/auth.service';
import { IGetMealData } from '@/types/meals.type';
import { Ipagination } from '@/types/pagination.type';
import { IgetReviewData, TResponseReviewData } from '@/types/reviews.type';
import { TUser } from '@/types/user.type';
import React from 'react'

const ReviewsPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search=await searchParams
  const reviews= await getAllreview()
  const userinfo = await getSession();
  if (!userinfo || !userinfo.data || !userinfo.success) {
    return (
      <ErrorFallback
        title="Authentication Error"
        message="You must be signed in to view your reviews."
      />
    );
  }
  const role=userinfo.data.role
  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback title="Loading reviews failed" message="Something went wrong while loading your reviews." />}>
        <MyReviewsTable pagination={reviews.pagination as Ipagination} role={role as string} reviews={reviews.data as TResponseReviewData<{meal:IGetMealData,customer:TUser,replies:any[]}>[]} />
      </ErrorBoundary>
    </div>
  )
}

export default ReviewsPage