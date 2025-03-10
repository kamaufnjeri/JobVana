import { useNotifications } from "@/context/NotificationProvider";
import React, { useState } from "react";
import Button from "../common/Button";
import PagesSection from "../common/PagesSection";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { formatDate } from "@/utils";
import Loading from "../common/Loading";

const NotificationsContainer = () => {
  const {
    notificationsData,
    markAsRead,
    deleteNotification,
    loading,
    loadingData,
    fetchNotifications,
    prevNext,
    filters,
    closeNotifications,
    showNotifications,
  } = useNotifications();
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [markAsReadId, setMarkAsReadId] =  useState<string | null>(null)

  const markAsReadFunc = async  (notId: string) => {
    setMarkAsReadId(notId);
    await markAsRead(notId)
    setMarkAsReadId(null);
  }
  const deleteNotificationFunc = async (notId: string) => {
    setDeletingId(notId)
    await deleteNotification(notId)
    setDeletingId(null)
  }
  return (
    <div
      className={`transition-all duration-500 ease-out fixed top-20 right-0 p-4 z-50 items-start flex flex-col gap-2 min-h-[200px] max-h-[500px] bg-gray-600 text-white overflow-y-auto h-auto ${showNotifications ? "w-full md:w-2/3 lg:w-1/2 opacity-100" : "w-[0px] opacity-0"}  rounded-lg shadow-lg`}
    >
      <div className="flex flex-row gap-2 justify-between w-full">
        <h3 className="text-h3">Notifications</h3>
        <button onClick={() => closeNotifications()}>
          <FaTimes className="text-2xl hover:opacity-80" />
        </button>
      </div>
      {notificationsData ? (
        <>
        <div className="flex flex-col gap-2 items-start">

          { loadingData ? <Loading styles="min-h-[200px]" /> : notificationsData?.results ?
            notificationsData.results.map((notification) => (
              <div key={notification.id} className="flex flex-col gap-2">
                <div className="flex gap-2 flex-rwo">
                <FaArrowRight/>
                <p
                  className={`text-p ${
                    notification.is_read ? "font-medium" : "font-semibold"
                  }`}
                >
                  {notification.message}
                </p>
                <p className="opacity-80">{formatDate(notification.created_at)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!notification.is_read && (
                    <Button
                      name="Mark as Read"
                      onClick={() => markAsReadFunc(notification.id)}
                      loading={markAsReadId === notification.id ? loading : false}
                      styles="bg-primary rounded-md text-white h-10 p-2 self-center"
                    />
                  )}
                  <Button
                    name="Delete"
                    loading={deletingId === notification.id ? loading : false}
                    onClick={() => deleteNotificationFunc(notification.id)}
                    styles="bg-red-500 hover:bg-read-600 rounded-md text-white h-10 p-2 self-center"
                  />
                </div>
              </div>
            ))
            : <h3 className="tet-h3">No notifications</h3>
          }
          
        </div>
      
        <div className="w-full flex items-center justify-center">
          <PagesSection
            noOfPages={notificationsData.total_pages}
            currentPage={notificationsData.current_page}
            data={notificationsData}
            prevNext={prevNext}
            searchItems={filters}
            getItems={fetchNotifications}
          />
        </div> 
      </>)
    :  <h3 className="tet-h3">No notifications</h3>  
    }
    </div>
  );
};

export default NotificationsContainer;
