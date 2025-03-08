import { JobFilterProps, PaginatedResponse } from "@/interfaces";
import api from "@/utils/api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

type Notification = {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type NotificationContextType = {
  notificationsData: PaginatedResponse<Notification> | null;
  setNotificationsData: React.Dispatch<
    React.SetStateAction<PaginatedResponse<Notification> | null>
  >;
  fetchNotifications: () => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  unreadCount: number;
  loading: boolean;
  loadingData: boolean;
  prevNext: (url: string | null) => void;
  filters: JobFilterProps;
  toggleShowNotifications: () => void;
  closeNotifications: () => void;
  showNotifications: boolean;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notificationsData, setNotificationsData] =
    useState<PaginatedResponse<Notification> | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<JobFilterProps>({
    page: 0,
  });
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);


  
  const closeNotifications = () => setShowNotifications(false);

  useEffect(() => {
    if (notificationsData) {
      const unreadNotifications = notificationsData.results.filter(
        (notif) => !notif.is_read
      );
      setUnreadCount(unreadNotifications.length); // Set the count
    }
  }, [notificationsData]);

  // Fetch notifications from the backend
  const fetchNotifications = async (filters?: {
    [key: string]: string | number;
  }) => {
    setLoadingData(true);
    try {
      const response = await api.get("notifications/mine/");

      if (response.status === 200) {
        setNotificationsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const toggleShowNotifications = () =>{
    setShowNotifications(!showNotifications);   
  }

  const markAsRead = async (id: string) => {
    if (!notificationsData) return; // Return early if data is null
    setLoading(true);
    try {
      const response = await api.patch(`notifications/${id}/`);

      if (response.status === 200) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    if (!notificationsData) return; // Return early if data is null
    setLoading(true);
    try {
      const response = await api.delete(`notifications/${id}/`);

      if (response.status === 204) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setLoading(false);
    }
  };

  const prevNext = async (url: string | null) => {
    setLoading(true);
    if (url) {
      try {
        const response = await api.get(url);
        if (response.status === 200) {
          setNotificationsData(response.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error("Error: Error fetching applications");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationsData,
        setNotificationsData,
        fetchNotifications,
        markAsRead,
        deleteNotification,
        unreadCount,
        loading,
        loadingData,
        prevNext,
        filters,
        toggleShowNotifications,
        closeNotifications,
        showNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
