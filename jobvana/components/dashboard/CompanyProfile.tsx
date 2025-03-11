import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CompanyProps } from "@/interfaces";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandlerUtils";
import DeleteModal from "@/components/common/DeleteModal";
import Button from "@/components/common/Button";

// component handles displaying, updating and deleting company for user whose role si employer
const CompanyProfile: React.FC = () => {
  const { company, setCompany } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<CompanyProps>({
    name: "",
    description: "",
  });

  // handles enabling editing for each field or key in company
  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    name: true,
    description: true,
  });

  // function to enable editing of a key or field
  const enableEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: false }));
  };

  // handles cancelling editing of a specific key
  const cancelEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: true }));
    if (company) {
      setFormData(company);
    }
  };

  // handles change of input or textarea fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // set formdata to company data on pagae load
  useEffect(() => {
    if (company) {
      setFormData(company);
    } else {
      setFormData({ name: "", description: "" }); // Ensure formData is always initialized
    }
  }, [company]);

  // handles updating a specific field or key or company
  const handleUpdateCompany = async (key: "name" | "description") => {
    if (company && formData) {
      if (formData[key]) {
        setLoading(true);
        const data = { [key]: formData[key] }; // Corrected object structure

        try {
          const response = await api.patch(`auth/company/${company.id}/`, data);
          if (response.status === 200) {
            // on success update comapany with the new data
            const updatedCompany = response.data.company;
            toast.success(response.data.message);
            setCompany(updatedCompany);
            setIsDisabled((prev) => ({ ...prev, [key]: true })); // Disable input after save
          } else if (response.data.error) {
            toast.error(response.data.error || "Company update failed");
          } else {
            throw new Error("Company update failed");
          }
        } catch (error) {
          console.error("Company update failed:", error);
          toast.error(handleApiError(error));
          setFormData(company);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const closeModal = () => setDeleteModalOpen(false); // close delete modal function
  const openModal = () => setDeleteModalOpen(true); // open delete modal functon

  // handles deleting company
  const handleDeleteCompany = async () => {
    if (company) {
      setLoading(true);
      try {
        const response = await api.delete(`auth/company/${company.id}/`);
        if (response.status === 204) {
          setCompany(null);
          setFormData({
            name: "",
            description: "",
          });

          toast.success("Company deleted successfully!");
        } else if (response.data.error) {
          toast.error(response.data.error || "Company delete failed");
        } else {
          throw new Error("Company delete failed");
        }
      } catch (error) {
        console.error("Company delete failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
        closeModal();
      }
    }
  };

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
          <h2 className="text-h2">Company Profile</h2>
        </div>
        {company && (
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
                disabled={isDisabled.name}
                value={formData?.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.name === false ? (
                  <>
                    <Button
                      name="Save"
                      loading={loading}
                      onClick={() => handleUpdateCompany("name")}
                      type="button"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      type="button"
                      onClick={() => cancelEditing("name")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    type="button"
                    onClick={() => enableEditing("name")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>

            <span className="flex flex-col gap-2 items-start">
              <label htmlFor="description" className="text-h6 font-medium">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                required
                disabled={isDisabled.description}
                value={formData?.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="rounded-md min-h-[120px] outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              ></textarea>
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.description === false ? (
                  <>
                    <Button
                      name="Save"
                      loading={loading}
                      onClick={() => handleUpdateCompany("description")}
                      type="button"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      type="button"
                      onClick={() => cancelEditing("description")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    type="button"
                    onClick={() => enableEditing("description")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>
            <Button
              name="Delete"
              type="button"
              onClick={openModal}
              styles="bg-red-500 hover:bg-red-600 lg:col-span-2 rounded-md text-white h-10 p-2 place-self-end"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
