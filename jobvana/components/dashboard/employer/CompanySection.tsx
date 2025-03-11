import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CompanyProps } from "@/interfaces";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/errorHandlerUtils";
import Button from "@/components/common/Button";

// component for creating company for a user with role applicant when they register or company is not created
const CompanySection: React.FC = () => {
  // get company data from the AuthContext
  const { company, setCompany } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  // formdata for input for the company
  const [formData, setFormData] = useState<CompanyProps>({
    name: "",
    description: "",
  });

  // handles input or textarea fuield change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handles adding company for user
  const handleCompanyAdd = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (formData) {
      try {
        // call backend api to post company
        const response = await api.post(`auth/company/`, formData);
        if (response.status === 201) {
          // on success set company
          const updatedCompany = response.data.company;
          toast.success(response.data.message);
          setCompany(updatedCompany);
          setFormData(updatedCompany);
        } else if (response.data.error) {
          toast.error(response.data.error || "Company add failed");
        } else {
          throw new Error("Company add failed");
        }
      } catch (error) {
        console.error("Company update failed:", error);
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {!company && (
        <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
          <div className="w-full flex-col gap-2 justify-between">
            <div className="w-full flex gap-2 flex-col">
              <h2 className="text-h2">Add Company</h2>
            </div>

            <form
              onSubmit={handleCompanyAdd}
              className="grid lg:grid-cols-2 grid-cols-1 gap-2 p-4"
            >
              <span className="flex flex-col gap-2 items-start">
                <label htmlFor="name" className="text-h6 font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </span>

              <span className="flex flex-col gap-2 items-start">
                <label htmlFor="description" className="text-h6 font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  value={formData?.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="rounded-md min-h-[120px] outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
                ></textarea>
              </span>

              <Button
                name="Save"
                loading={loading}
                type="submit"
                styles="bg-primary rounded-md text-white h-10 p-2 lg:col-span-2 place-self-end"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanySection;
