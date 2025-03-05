import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface Location {
  label: string;
  value: string;
  type: string;
}

interface LocationContextType {
  locations: Location[];
  searchLocations: (query: string) => void;
  error: string | null;
  loading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/files/locations.json");
        const data = response.data;
        setAllLocations(data);
        setFilteredLocations(data.slice(0, 50));
      } catch (error) {
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const searchLocations = (query: string) => {
    if (!query) {
      setFilteredLocations(allLocations.slice(0, 50));
      return;
    }
    const results = allLocations.filter((loc) =>
      loc.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLocations(results.slice(0, 50));
  };

  return (
    <LocationContext.Provider
      value={{ locations: filteredLocations, searchLocations, error, loading }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
