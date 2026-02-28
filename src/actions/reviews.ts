'use server'
import { ModerateData, reviewService } from "@/services/review";

export const createReviewAction = async (mealid:string,data:any) => {
  return await reviewService.createReview(mealid,data);
};

export const deleteReviewAction = async (reviewId: string) => {
  return await reviewService.deleteReview(reviewId);
};

export const moderateReviewAction = async (reviewId: string, data: ModerateData) => {
  return await reviewService.moderateReview(reviewId, data);
};

export const reviewUpdate = async (reviewId: string, comment:string) => {
  return await reviewService.reviewUpdate(reviewId, comment);
};

export const getAllreview = async () => {
  return await reviewService.getAllReviews();
};