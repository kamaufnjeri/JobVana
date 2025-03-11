import Button from "@/components/common/Button";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { capitalizeWords } from "@/utils";

interface DeleteModalProps {
  loading: boolean; // show spin when loading
  closeModal: () => void; // function for closing modal
  deleteItem: () => void; // The delete function will accept any item
  itemName: string; // Modal name passed as prop for better identification
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  loading,
  closeModal,
  deleteItem,
  itemName,
}) => {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg p-4 lg:w-2/3 md:w-2/3 w-full flex flex-col gap-2 relative h-auto items-center justify-center">
        <FaTimes
          className="cursor-pointer text-2xl hover:text-primary top-4 right-4 absolute"
          onClick={closeModal}
        />

        <h3 className="text-h3">Delete {itemName ? itemName : 'Unknown Item'}</h3>
        <p className="text-p">Are you sure you want to delete this item?</p>
        <div className="mt-2">
          <p className="text-p font-semibold">{itemName || "Unnamed Item"}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            loading={loading}
            name="Delete"
            styles="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => deleteItem()} // Trigger delete on click
          />
          <Button
            name="Cancel"
            styles="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
