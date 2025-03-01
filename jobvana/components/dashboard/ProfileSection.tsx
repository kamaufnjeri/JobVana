import React, { useState } from 'react'
import Button from '../common/Button';
import { useAuth } from '@/context/AuthContext';

const ProfileSection: React.FC = () => {
  const { user } = useAuth();

  const [isDisabled, setIsDisabled] = useState<{ [key: string]: boolean }>({
    first_name: true,
    last_name: true,
    email: true,
  });

  const enableEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: false }));
  };

  console.log(isDisabled)
 

  const cancelEditing = (key: string) => {
    setIsDisabled((prev) => ({ ...prev, [key]: true }));
  };
  return (
    <div className="p-4 border border-borderColor rounded-md shadow flex flex-col gap-4 w-full">
      <div className="w-full flex-col gap-2 justify-between">
        <div className="w-full flex gap-2 flex-col">
          <h2 className="text-h2">User Profile</h2>
        </div>
       
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
                value={user.first_name}
                placeholder="Enter first name"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.first_name === false ? (
                  <>
                    <Button
                      name="Save"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      onClick={() => cancelEditing("first_name")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
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
                value={user.last_name}
                placeholder="Enter last name"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.last_name === false ? (
                  <>
                    <Button
                      name="Save"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      onClick={() => cancelEditing("last_name")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
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
                value={user.email}
                placeholder="Enter email"
                className="rounded-md outline-none bg-white w-full border border-borderColor p-2 focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div className="self-end flex flex-row gap-2 items-end">
                {isDisabled.email === false ? (
                  <>
                    <Button
                      name="Save"
                      styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                    />
                    <Button
                      name="Cancel"
                      onClick={() => cancelEditing("email")}
                      styles="bg-gray-700 rounded-md text-white h-10 p-2 w-full self-end"
                    />
                  </>
                ) : (
                  <Button
                    name="Edit"
                    onClick={() => enableEditing("email")}
                    styles="bg-primary rounded-md text-white h-10 p-2 w-full self-end"
                  />
                )}
              </div>
            </span>
          </div>
      </div>
    </div>
  )
}

export default ProfileSection
