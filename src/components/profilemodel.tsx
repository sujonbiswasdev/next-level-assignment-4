"use client";
import { Pencil, Save, Trash2, X } from "lucide-react";
import InfoRow from "./infoRow";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Status, StatusIndicator, StatusLabel } from "./ui/status";
import { use, useState } from "react";
import { Input } from "./ui/input";
import ShareProfileButton from "./profileshare";
import { deleteuserown, updateUser } from "@/actions/user.actions";
import { TUpdateUserInput, TUser } from "@/types/user.type";
import { updateUserSchema } from "@/validations/auth.validation";

function ProfileModal({ user }: { user: TUser }) {
  const router = useRouter();
  const [useinfo, setuserinfo] = useState<TUser>({ ...user });
  const [inputvalue, setinputvalue] = useState<Partial<TUpdateUserInput>>({});
  const [editfield, seteditfield] = useState<
    string | boolean | "bgimage" | "name" | "phone" | "isActive"
  >("");
  if (!user) {
    toast("user not found", { autoClose: 2000, theme: "colored" });
    router.push("/");
  }
  const defaultProfile =
    "https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg";
  const handleUpdateUser = async <k extends keyof TUser>(
    field: k,
    value: TUser[k]
  ) => {
    if (value == null) {
      toast.error("please provide a value", {
        theme: "colored",
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }
    const parseData = updateUserSchema.safeParse({ [field]: value });
    if (!parseData.success) {
      const errors = parseData.error.flatten().fieldErrors;

      Object.values(errors).forEach((err) => {
        if (err) {
          toast.error(err[1], {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      });
      return;
    }
    try {
      const toastid = toast.loading(`"user ${field} updating...."`, {
        theme: "dark",
        position: "bottom-right",
        autoClose: 2000,
      });
      const res = await updateUser({ [field]: value });
      if (res.error) {
        toast.dismiss(toastid);
        toast.error(res.message || `"user ${field} update failed"`, {
          theme: "dark",
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }
      toast.dismiss(toastid);
      toast.success(
        res.result?.message || `"user ${field} update successfully"`,
        {
          theme: "dark",
          position: "bottom-right",
          autoClose: 2000,
        }
      );
      setuserinfo((prev) => ({ ...prev, [field]: value }));
    } catch (error: any) {
      toast.error(`someting went wrong please try again`);
    }
  };
  const handleDelete = async () => {
    const toastid = toast.loading("user deleting....");
    const res = await deleteuserown();
    if (res.error) {
      toast.dismiss(toastid);
      toast.error(res.message || "user account delete fail");
      return;
    }
    toast.dismiss(toastid);
    toast.success(res.result?.message || "user account delete successfully");
    router.push("/")
    router.refresh();
    window.location.reload();
  };

  return (
    <div
      className="
        w-full 
        mt-6
        md:mt-10
        lg:mt-20
        max-w-[1480px] 
        sm:max-w-xl 
        md:max-w-2xl 
        lg:max-w-3xl 
        xl:max-w-4xl 
        rounded-2xl 
        bg-white 
        shadow-2xl 
        mx-auto
        px-2
        sm:px-4
        md:px-5
        lg:px-6
        xl:px-8
        2xl:px-10
        py-3
        sm:py-4
        md:py-6
        lg:py-7
        xl:py-8
        "
    >
      {/* Header */}
      <div
        className="
          flex flex-col 
          md:flex-row
          items-center 
          md:items-center
          justify-between 
          border-b 
          p-4 
          sm:p-6 
          max-w-full
          bg-cover 
          bg-center
          gap-4
        "
        style={{
          backgroundImage: `url(${useinfo.bgimage})`,
        }}
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          {editfield !== "image" ? (
            <div className="flex items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
              <div className="flex gap-1 pr-1">
                <img
                  src={useinfo.image || defaultProfile}
                  alt="profile"
                  className="
                    w-[68px] h-[68px]
                    sm:w-[90px] sm:h-[90px] 
                    md:w-[100px] md:h-[100px]
                    object-cover 
                    rounded-full 
                    shadow-sm 
                    border-2
                    transition-all duration-200
                  "
                />
                <button
                  className="w-[28px] -ml-3 -mt-4 flex"
                  onClick={() => seteditfield("image")}
                >
                  <Pencil className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md  text-xs sm:text-[5px]" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-1 bg-blue-200 rounded-sm w-full">
              <Input
                className="focus:ring-2 placeholder:text-black w-full min-w-[100px] max-w-[220px] sm:max-w-xs"
                onChange={(e) =>
                  setinputvalue({ ...inputvalue, image: e.target.value })
                }
                placeholder="Enter your image url"
              />
              <button
                className="w-[28px] -ml-3 -mt-4"
                onClick={() => {
                  handleUpdateUser("image", inputvalue.image as string);
                  seteditfield("");
                }}
              >
                <Save className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md text-xs sm:text-[5px]" />
              </button>
            </div>
          )}
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <div className="flex items-center gap-4">
            {editfield !== "bgimage" ? (
              <div className="flex items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
                <div className="flex gap-1 pr-1">
                  <button
                    className="w-[28px] ml-3 -mt-1"
                    onClick={() => seteditfield("bgimage")}
                  >
                    <Pencil className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md text-xs sm:text-[5px]" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-1 bg-blue-200 rounded-sm w-full">
                <Input
                  className="focus:ring-2 placeholder:text-black w-full min-w-[100px] max-w-[220px] sm:max-w-xs"
                  onChange={(e) =>
                    setinputvalue({ ...inputvalue, bgimage: e.target.value })
                  }
                  placeholder="Enter your image url"
                />
                <button
                  className="w-[28px] -ml-3 -mt-4"
                  onClick={() => {
                    handleUpdateUser("bgimage", inputvalue.bgimage as string);
                    seteditfield("");
                  }}
                >
                  <Save className="bg-gray-100 text-blue-800 shadow-sm p-1 rounded-md text-xs sm:text-[5px]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="divide-y">
        {editfield !== "name" ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4 gap-2 sm:gap-0">
            <Label className="text-gray-600 mb-1 sm:mb-0">Name</Label>
            <div className="flex gap-1 pr-1 items-center">
              <p className="text-gray-900 break-all">{useinfo?.name}</p>
              <button className="w-[28px]" onClick={() => seteditfield("name")}>
                <Pencil className="text-green-800 text-xs sm:text-[5px]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4 gap-1">
            <Input
              className="w-full sm:w-auto"
              onChange={(e) =>
                setinputvalue({ ...inputvalue, name: e.target.value })
              }
              placeholder="Enter your name"
            />
            <button
              className="mt-2 sm:mt-0"
              onClick={() => {
                handleUpdateUser("name", inputvalue.name as string);
                seteditfield("");
              }}
            >
              <Save className="text-blue-800 text-xs sm:text-[5px]" />
            </button>
          </div>
        )}

        <InfoRow label="Email Address" value={user.email} />

        {editfield !== "phone" ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4 gap-2 sm:gap-0">
            <Label className="text-gray-600 mb-1 sm:mb-0">phone</Label>
            <div className="flex gap-1 pr-1 items-center">
              <p className="text-gray-900 break-all">
                {useinfo?.phone || "017********"}
              </p>
              <button className="w-[28px]" onClick={() => seteditfield("phone")}>
                <Pencil className="text-green-800 text-xs sm:text-[5px]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4 gap-1">
            <Input
              className="w-full sm:w-auto"
              onChange={(e) =>
                setinputvalue({ ...inputvalue, name: e.target.value })
              }
              placeholder="Enter your phone number"
            />
            <button
              className="mt-2 sm:mt-0"
              onClick={() => {
                handleUpdateUser("phone", inputvalue.name as string);
                seteditfield("");
              }}
            >
              <Save className="text-blue-800 text-xs sm:text-[5px]" />
            </button>
          </div>
        )}
        <InfoRow label="role" value={user.role as string} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
          <Label className="text-gray-600 mb-1 sm:mb-0">status</Label>
          <h4>
            {user.status == "activate" ? (
              <div>
                <Status variant="success">
                  <StatusIndicator />
                  <StatusLabel className="text-gray-900">
                    {user.status}
                  </StatusLabel>
                </Status>
              </div>
            ) : (
              <>
                <Status variant="error">
                  <StatusIndicator />
                  <StatusLabel className="text-gray-900">
                    {user.status}
                  </StatusLabel>
                </Status>
              </>
            )}
          </h4>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
          <Label className="text-gray-600 mb-1 sm:mb-0">emailVerified</Label>
          <h4>
            {user.emailVerified ? (
              <div>
                <Status variant="success">
                  <StatusIndicator />
                  <StatusLabel className="text-gray-900">Yes</StatusLabel>
                </Status>
              </div>
            ) : (
              <>
                <Status variant="error">
                  <StatusIndicator />
                  <StatusLabel className="text-gray-900">No</StatusLabel>
                </Status>
              </>
            )}
          </h4>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
          <Label className="text-gray-600 mb-1 sm:mb-0">isActive</Label>

          {editfield !== "isActive" ? (
            <div className="flex gap-1 items-center">
              <h4>
                {useinfo.isActive ? (
                  <div>
                    <Status variant="success">
                      <StatusIndicator />
                      <StatusLabel className="text-gray-900">
                        online
                      </StatusLabel>
                    </Status>
                  </div>
                ) : (
                  <>
                    <Status variant="error">
                      <StatusIndicator />
                      <StatusLabel className="text-gray-900">
                        offline
                      </StatusLabel>
                    </Status>
                  </>
                )}
              </h4>
              <button
                className="w-[28px]"
                onClick={() => seteditfield("isActive")}
              >
                <Pencil className="text-green-800 text-xs sm:text-[5px]" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center px-0 md:px-6 py-2 sm:py-4 gap-1">
              <Input
                type="checkbox"
                checked={(inputvalue.isActive as boolean) || false}
                onChange={(e) =>
                  setinputvalue((prev: any) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
              />
              <button
                onClick={() => {
                  handleUpdateUser("isActive", inputvalue.isActive as boolean);
                  seteditfield("");
                }}
                className="mt-2 sm:mt-0"
              >
                <Save className="text-blue-800 text-xs sm:text-[5px]" />
              </button>
            </div>
          )}
        </div>
        {/* <InfoRow
          label="createdAt"
          // value={user.createdAt.toLocaleString().slice(0, 10)}
        /> */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
          <h2 className="text-sm text-gray-600 mb-2 sm:mb-0">
            Profile
          </h2>
          <ShareProfileButton userId={user.id} userName={user.name} />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-6 py-2 sm:py-4">
          <h2 className="text-sm text-gray-600 mb-2 sm:mb-0">
            account
          </h2>
          <button
            onClick={handleDelete}
            className="px-4 flex items-center gap-1 py-2 bg-red-600 text-white rounded-md shadow-sm mt-2 sm:mt-0"
          >
            <Trash2 /> remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
