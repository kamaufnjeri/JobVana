import Button from "@/components/common/Button";
import { JOB_DETAILS_OPTIONS } from "@/constants";
import { JobDetailProps, JobProps } from "@/interfaces";
import api from "@/utils/api";
import { handleApiError } from "@/utils/errorHandlerUtils";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

interface InputFieldProps {
  detail: JobDetailProps;
  setDetail: (key: string, value: string) => void;
  isEditing: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  detail,
  setDetail,
  isEditing,
}) => (
  <div className="flex flex-col lg:flex-row gap-2 w-full">
    <input
      type="text"
      value={detail.description}
      disabled={!isEditing}
      onChange={(e) => setDetail("description", e.target.value)}
      placeholder="Enter a responsibility, benefit, or requirement..."
      className="rounded-md text-gray-900 h-10 bg-white outline-none border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 w-full"
    />
    <Select
      options={JOB_DETAILS_OPTIONS}
      isDisabled={!isEditing}
      value={JOB_DETAILS_OPTIONS.find((option) => option.value === detail.type)}
      onChange={(selectedOption) =>
        setDetail("type", selectedOption?.value || "")
      }
      menuPlacement="top"
      placeholder="Type"
      className="w-[220px] text-gray-800"
    />
  </div>
);

const JobDetailsEditContainer: React.FC<{
  detailsList: JobDetailProps[];
  setDetailsList: (details: JobDetailProps[]) => void;
  job: JobProps | null;
}> = ({ detailsList, setDetailsList, job }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<{
    [key: string]: JobDetailProps;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [addData, setAddData] = useState<JobDetailProps>({
    description: "",
    type: "",
  });
  const [loadingDelete, setLoadingDelete] = useState<{ [key: number]: boolean }>({});
  const [addDetail, setAddDetail] = useState<boolean>(false);

  // Handle edit by setting editing data for the corresponding index in detailsList
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingData((prevData) => ({
      ...prevData,
      [index]: { ...detailsList[index] },
    }));
  };

  // Handle changes in input fields
  const handleChange = (key: string, value: string) => {
    if (editingData && editingIndex !== null) {
      setEditingData((prevData) =>
        prevData
          ? {
              ...prevData,
              [editingIndex]: {
                ...prevData[editingIndex], // keep other details intact
                [key]: value, // update the key that was changed
              },
            }
          : {}
      );
    }
  };

  // Cancel editing for the current item (restores the original data for that index)
  const cancelEditing = () => {
    if (editingIndex !== null) {
      setEditingData((prevData) => ({
        ...prevData,
        [editingIndex]: { ...detailsList[editingIndex] }, // Restore original data for the index
      }));
      setEditingIndex(null); // Reset editing index
    }
  };

  const handleUpdate = async (index: number) => {
    if (!job || !editingData) return;
    try {
      setLoading(true);
      const response = await api.patch(
        `jobs/details/${editingData[index].id}/`,
        editingData[index]
      );

      if (response.status === 200) {
        const updatedDetail = response.data.job_detail;
        const updatedList = [...detailsList];
        console.log(response.data);
        updatedList[index] = updatedDetail;
        setDetailsList(updatedList);
        toast.success(response.data.message);
      } else if (response.data.error) {
        toast.error(response.data.error || "Job detail update failed");
      } else {
        throw new Error("Job detail update failed");
      }
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setEditingIndex(null);
      setLoading(false);
    }
  };

  const handleDelete = async (index: number, detailId?: number | string) => {
    if (detailId) {
      try {
        setLoadingDelete((prev) => ({...prev, [index]: true}));
        const response = await api.delete(`jobs/details/${detailId}/`);

        if (response.status === 204) {
          console.log(response)
          toast.success(response.data.message);

          setDetailsList(
            detailsList.filter((detail, i) => detail.id !== detailId)
          );
        } else if (response.data.error) {
          toast.error(response.data.error || "Job detail delete failed");
        } else {
          throw new Error("Job detail delete failed");
        }
      } catch (error) {
        toast.error(handleApiError(error));
      } finally {
        setLoadingDelete((prev) => ({...prev, [index]: false}));
      }
    }
  };

  const handleAddDetail = async () => {
    if (!job) return;
    try {
      setLoading(true);
      const response = await api.post(`jobs/${job.id}/details/`, addData);
      if (response.status === 201) {
        setDetailsList([...detailsList, response.data.job_detail]);
        toast.success(response.data.message);
        setAddData({
          description: "",
          type: "",
        });
      } else if (response.data.error) {
        toast.error(response.data.error || "Job detail adding failed");
      } else {
        throw new Error("Job detail adding failed");
      }
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <ul className="flex w-full flex-col gap-2">
        {detailsList.map((item, index) => (
          <li
            key={index}
            className="flex flex-row gap-2 items-center justify-between p-2 rounded-md border border-gray-300 w-full"
          >
            <div className="flex flex-col gap-2 w-full">
              <InputField
                detail={
                  editingData && editingIndex === index
                    ? editingData[index]
                    : item
                } // Ensure editingIndex is not null before using it
                setDetail={handleChange}
                isEditing={editingIndex === index}
              />
              {editingIndex === index ? (
                <div className="flex gap-2 self-end items-end">
                  <Button
                    name="Save"
                    onClick={() => handleUpdate(index)}
                    styles="bg-primary rounded-md text-white h-10 p-2"
                    loading={loading}
                  />
                  <Button
                    name="Cancel"
                    onClick={() => cancelEditing()}
                    styles="bg-gray-400 rounded-md text-white h-10 p-2"
                  />
                </div>
              ) : (
                <div className="flex gap-2 self-end">
                  <Button
                    name="Edit"
                    onClick={() => handleEdit(index)}
                    styles="bg-primary rounded-md text-white h-10 p-2"
                  />
                  <Button
                    name="Delete"
                    onClick={() => handleDelete(index, item.id)}
                    styles="bg-red-500 rounded-md text-white h-10 p-2"
                    loading={loadingDelete[index]}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 w-full">
        {addDetail && (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col lg:flex-row gap-2 w-full">
              <input
                type="text"
                value={addData.description}
                name="description"
                id="description"
                onChange={(e) => {
                  const { name, value } = e.target;
                  console.log(name, value);
                  setAddData((prev) => ({
                    ...prev,
                    [name]: value,
                  }));
                }}
                placeholder="Enter a responsibility, benefit, or requirement..."
                className="rounded-md text-gray-900 h-10 outline-none bg-white border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <Select
                options={JOB_DETAILS_OPTIONS}
                value={
                  addData.type
                    ? JOB_DETAILS_OPTIONS.find((option) => option.value === addData.type)
                    : null // When addData.type is "", reset the value
                }
                onChange={(selectedOption) =>
                  setAddData((prev) => ({
                    ...prev,
                    type: selectedOption?.value || "",
                  }))
                }
                menuPlacement="top"
                placeholder="Type"
                className="w-[220px] text-gray-800"
              />
            </div>

            <div className="flex gap-2 self-end items-end">
              <Button
                name="Save"
                onClick={() => handleAddDetail()}
                styles="bg-primary rounded-md text-white h-10 p-2"
                loading={loading}
              />
              <Button
                name="Cancel"
                onClick={() => setAddDetail(false)}
                styles="bg-gray-400 rounded-md text-white h-10 p-2"
              />
            </div>
          </div>
        )}
      </div>
      <Button
        name="Add"
        onClick={() => setAddDetail(true)}
        styles="bg-primary text-white rounded-md h-10 p-2 self-start"
      />
    </div>
  );
};

export default JobDetailsEditContainer;
