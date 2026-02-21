import SignleMealByid from "@/components/meals/singleMeal";
import { mealsService } from "@/services/meals";
import Image from "next/image";
import { notFound } from "next/navigation";
type PageProps = {
  params: { id: string };
};

export default async function SingleMealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await mealsService.getmealsbyid(id);
  if (!res?.data) return notFound();

  const meal = res.data.result.data;
  console.log(meal,'meals datafor')

  // const reviews = meal.reviews || [];

  // const averageRating =
  //   reviews.length > 0
  //     ? (
  //         reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
  //         reviews.length
  //       ).toFixed(1)
  //     : "0.0";

  // const ratingCount = (star: number) =>
  //   reviews.filter((r: any) => r.rating === star).length;

  return (
    <>
    <SignleMealByid meal={meal}/>
    </>
  );
}