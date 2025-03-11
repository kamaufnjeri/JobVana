import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { useAuth } from "@/context/AuthContext";
import { UserProps } from "@/interfaces";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandlerUtils";
import DeleteModal from "../common/DeleteModal";
import { clearCookiesAndRedirect } from "@/utils/authUtils";
import { capitalizeFirstLetter } from "@/utils";


const UserProfile: React.FC = () => {
  const { user, setUser } = useAuth(); // get user from AuthContext
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  // user data for editing
  const [formData, setFormData] = useState<UserProps>({
    first_name: "",
    id: "",
    last_name: "",
    email: "",
    role: "",
  });

  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    first_name: true,
    last_name: true,
    email: true,
  });

  const enableEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: false }));
  };

  const cancelEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: true }));
    if (user) {
      setFormData(user);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleUpdateUser = async (
    key: "first_name" | "last_name" | "email"
  ) => {
    if (user && formData) {
      if (formData[key]) {
        setLoading(true);
        const data = { [key]: formData[key] }; // Corrected object structure

        try {
          const response = await api.patch(`auth/me/`, data);
          if (response.status === 200) {
            const updatedUser = response.data.data;
            toast.success(response.data.message);
            setUser(updatedUser);
          } else if (response.data.error) {
            toast.error(response.data.error || "User update failed");
          } else {
            throw new Error("User update failed");
          }
        } catch (error) {
          console.error("User update failed:", error);
          toast.error(handleApiError(error));
          setFormData(user);
        } finally {
          setLoading(false);
          setIsDisabled((prev) => ({ ...prev, [key]: true })); // Disable input after save
        }
      }
    }
  };

  const handleDeleteUser = async () => {
    if (user) {
      setLoading(true);
      try {
        const response = await api.delete(`auth/me/`);
        if (response.status === 204) {
          clearCookiesAndRedirect();
          setUser(null);
          setFormData((prev) => ({
            ...prev,
            first_name: "",
            last_name: "",
            email: "",
          }));
          toast.success("User deleted successfully!");
        } else if (response.data.error) {
          toast.error(response.data.error || "User delete failed");
        } else {
          throw new Error("User delete failed");
        }
      } catch (error) {
        console.error("User delete failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
      }
    }
  };

  const closeModal = () => setDeleteModalOpen(false);
  const openModal = () => setDeleteModalOpen(true);

  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      {deleteModalOpen && user && (
        <DeleteModal
          loading={loading}
          deleteItem={handleDeleteUser}
          closeModal={closeModal}
          itemName={`Account for - ${user.email}`}
        />
      )}
      <div className="w-full flex-col gap-2 justify-between">
        <div className="w-full flex gap-2 flex-col">
          <h2 className="text-h2">User Profile</h2>
        </div>

        {user && (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 p-4">
            <span className="flex flex-col gap-2 items-start">
              <label htmlFor="first_name" className="text-h6 font-medium">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                required
                disabled={isDisabled.first_name}
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.first_name === false ? (
                  <>
                    <Button
                      name="Save"
                      loading={loading}
                      onClick={() => handleUpdateUser("first_name")}
                      type="button"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      type="button"
                      onClick={() => cancelEditing("first_name")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    type="button"
                    onClick={() => enableEditing("first_name")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>

            <span className="flex flex-col gap-2 items-start">
              <label htmlFor="last_name" className="text-h6 font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                required
                disabled={isDisabled.last_name}
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.last_name === false ? (
                  <>
                    <Button
                      name="Save"
                      loading={loading}
                      onClick={() => handleUpdateUser("last_name")}
                      type="button"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      type="button"
                      onClick={() => cancelEditing("last_name")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    type="button"
                    onClick={() => enableEditing("last_name")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>
            <span className="flex flex-col gap-2 items-start">
              <label htmlFor="first_name" className="text-h6 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                disabled={isDisabled.email}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.email === false ? (
                  <>
                    <Button
                      name="Save"
                      loading={loading}
                      onClick={() => handleUpdateUser("email")}
                      type="button"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      type="button"
                      onClick={() => cancelEditing("email")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    type="button"
                    onClick={() => enableEditing("email")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>
            <span className="flex flex-col gap-2 items-start">
              <h6 className="text-h6 font-medium">Role</h6>
              <p className="text-p">{capitalizeFirstLetter(user.role)}</p>
              <Button
                name="Delete"
                type="button"
                onClick={openModal}
                styles="bg-red-500 hover:bg-red-600 rounded-md text-white h-10 p-2 self-end"
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
