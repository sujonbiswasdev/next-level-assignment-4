"use client";
import { useState } from "react";

type UserType = {
  id: string;
  name: string;
};

type ReviewType = {
  id: string;
  customer: UserType;
  rating: number;
  comment: string;
  replies: ReviewType[];
};

type MealType = {
  id: string;
  meals_name: string;
  description: string;
  price: number;
  image?: string;
  reviews: ReviewType[];
};

export default function MealDemo() {
  // Sample data
  const [meal] = useState<MealType>({
    id: "m1",
    meals_name: "Cheese Burger",
    description: "Juicy beef burger with cheese and fresh veggies",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb47?auto=format&fit=crop&w=800&q=80",
    reviews: [
      {
        id: "r1",
        customer: { id: "u1", name: "Alice" },
        rating: 5,
        comment: "Amazing burger, very juicy!",
        replies: [],
      },
      {
        id: "r2",
        customer: { id: "u2", name: "Bob" },
        rating: 4,
        comment: "Good taste but a bit small.",
        replies: [
          {
            id: "r3",
            customer: { id: "u1", name: "Alice" },
            rating: 0, // reply, no rating
            comment: "Yes, agreed! Portion can be bigger.",
            replies: [],
          },
        ],
      },
    ],
  });

  const avgRating =
    meal.reviews.length > 0
      ? (
          meal.reviews.reduce((a, r) => a + r.rating, 0) /
          meal.reviews.filter(r => r.rating > 0).length
        ).toFixed(1)
      : "No ratings";

  return (
    <div style={{ maxWidth: "600px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1>{meal.meals_name}</h1>
      <img
        src={meal.image}
        alt={meal.meals_name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <p>{meal.description}</p>
      <p>Price: {meal.price} BDT</p>
      <p>Average Rating: {avgRating}⭐</p>

      <h2>Reviews:</h2>
      {meal.reviews.map(review => (
        <div
          key={review.id}
          style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.5rem",
          }}
        >
          {review.rating > 0 && (
            <p>
              <strong>{review.customer.name}</strong> ({review.rating}⭐): {review.comment}
            </p>
          )}
          {review.rating === 0 && (
            <p style={{ marginLeft: "20px" }}>
              <strong>{review.customer.name}</strong>: {review.comment}
            </p>
          )}

          {review.replies.map(reply => (
            <div key={reply.id} style={{ marginLeft: "20px" }}>
              <p>
                <strong>{reply.customer.name}</strong>: {reply.comment}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}