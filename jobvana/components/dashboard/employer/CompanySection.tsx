import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";
import { CompanyProps } from "@/interfaces";
import React, { useEffect, useState } from "react";

const defaultCommpany : CompanyProps = {
  name: '',
  logo: '',
  description: ''
}
const CompanySection: React.FC = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<CompanyProps>(defaultCommpany);

  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    name: true,
    description: true,
    logo: true,
  });

  const enableEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: false }));
  };

  useEffect(() => {
    if (user.company) {
      setCompany(user.company);
    }
  }, [user]);

  const cancelEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: true }));
  };
  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      <div className="w-full flex-col gap-2 justify-between">
        <div className="w-full flex gap-2 flex-col">
          <h2 className="text-h2">Company Section</h2>
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
                value={company.name}
                placeholder="Enter company name"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.name === false ? (
                  <>
                    <Button
                      name="Save"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      onClick={() => cancelEditing("name")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    onClick={() => enableEditing("name")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>
            <span className="flex flex-col gap-2 items-start">
              <label
                htmlFor="description"
                className="text-h6 font-medium flex flex-row gap-2"
              >
                <h6>Description</h6>
                <h6 className="text-red-500">*</h6>
              </label>
              <textarea
                name="description"
                id="description"
                required
                disabled={isDisabled.description}
                value={company.description}
                placeholder="Enter description"
                className="rounded-md outline-none w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900 min-h-[100px] bg-white"
              ></textarea>
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.description === false ? (
                  <>
                    <Button
                      name="Save"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      onClick={() => cancelEditing("description")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    onClick={() => enableEditing("description")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>
          </div>)}
        
        </div>
    </div>
  );
};

export default CompanySection;
