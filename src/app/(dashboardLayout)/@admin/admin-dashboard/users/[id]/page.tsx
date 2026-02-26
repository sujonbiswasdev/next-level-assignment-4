import UserUpdate from "@/components/modules/users/userprofilechange";

const UpdateUser = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  if (!id) {
    return (
      <div className="p-4 text-red-500">
        Failed to load users
      </div>
    );
  }
  return (
    <div>
      <UserUpdate userid={id}/>
    </div>
  )
}

export default UpdateUser