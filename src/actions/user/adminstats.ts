"use server"

import { adminService } from "@/services/users/adminstats"


// Users 
export const getUserStats = async () => {
  return await adminService.getUserStats()
}

//  Meals 
export const getMealsStats = async () => {
  return await adminService.getMealsStats()
}

// Orders 
export const getOrdersStats = async () => {
  return await adminService.getOrdersStats()
}

//  Revenue 
export const getRevenueStats = async () => {
  return await adminService.getRevenueStats()
}

//  Reviews 
export const getReviewStats = async () => {
  return await adminService.getReviewStats()
}

// Categories 
export const getCategoryStats = async () => {
  return await adminService.getCategoryStats()
}