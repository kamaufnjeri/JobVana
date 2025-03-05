import Button from "@/components/common/Button";
import DeleteModal from "@/components/common/DeleteModal";
import { useAuth } from "@/context/AuthContext";
import { CompanyProps } from "@/interfaces";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CompanySection: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setCompany] = useState<CompanyProps | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string }>({
    name: "",
  });

  useEffect(() => {
    if (user && user.company) {
      setCompany(user.company);
      setFormData({ name: user.company.name }); // Initialize form data with company name
    }
  }, [user]);

  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    name: true,
  });

  const enableEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCompany = async () => {
    if (company) {
      setLoading(true);

      try {
        const response = await api.patch(`company/${company.id}`, formData);

        if (response.status === 200) {
          const company = response.data.data;
          setCompany((prev) => ({
            ...prev,
            id: company.name,
            name: company.name,
          }));
          toast.success("Company updated successfully!");
        }
      } catch (error) {
        console.error("Company update failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
        setIsDisabled({ name: true }); // Disable input after save
      }
    }
  };

  const handleDeleteCompany = async () => {
    if (company) {
      setLoading(true);

      try {
        const response = await api.delete(`company/${company.id}`);

        if (response.status === 204) {
          setCompany(null);
          setFormData({ name: "" });
          toast.success("Company deleted successfully!");
        }
      } catch (error) {
        console.error("Company delete failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
      }
    }
  };

  const cancelEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: true }));
    setFormData({ name: company ? company.name : "" }); // Reset form data to original value
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("company", formData);

      if (response.status === 201) {
        const company = response.data.data;
        setCompany((prev) => ({
          ...prev,
          id: company.id,
          name: company.name,
        }));
        setFormData({
          name: company.name,
        });

        toast.success("Company created successfully!");
      }
    } catch (error) {
      console.error("Company creation failed:", error);
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const closeModal = () => setDeleteModalOpen(false);
  const openModal = () => setDeleteModalOpen(true);

  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      {deleteModalOpen && company && (
        <DeleteModal
          loading={loading}
          deleteItem={handleDeleteCompany}
          closeModal={closeModal}
          itemName={`Company - ${company.name}`}
        />
      )}
      <div className="w-full flex-col gap-2 justify-between">
        <div className="w-full flex gap-2 flex-col">
          <h2 className="text-h2">Company Section</h2>
        </div>
        {company ? (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 p-4">
            <span className="flex flex-col gap-2 items-start">
              <label htmlFor="name" className="text-h6 font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={handleChange}
                disabled={isDisabled.name}
                value={formData.name}
                placeholder="Enter company name"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </span>
            <div className="place-self-end grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-2 items-end">
              {isDisabled.name === false ? (
                <>
               
                <Button
                    name="Save"
                    type='button'
                    loading={loading}
                    onClick={handleUpdateCompany}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                   <Button
                    name="Delete"
                    type='button'
                    onClick={openModal}
                    styles="bg-red-500 hover:bg-red-600 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                  
                  <Button
                  type='button'
                    name="Cancel"
                    onClick={() => cancelEditing("name")}
                    styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                  />
                </>
              ) : (
                <>
                  <Button
                    name="Edit"
                    type='button'
                    onClick={() => enableEditing("name")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                 
                </>
              )}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-2 grid-cols-1 gap-2 p-4"
          >
            <span className="flex flex-col gap-2">
              <label htmlFor="name" className="text-h6 font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                onChange={handleChange}
                value={formData.name}
                placeholder="Enter company name"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </span>
            <div className="place-self-end">
              <Button
                name="Save"
                type="submit"
                loading={loading}
                styles="bg-primary rounded-md text-white h-10 p-2"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanySection;
