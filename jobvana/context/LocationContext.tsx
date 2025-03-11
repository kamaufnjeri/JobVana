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
    // fetch locations from locations.json file
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/files/locations.json");
        const data = response.data;
        setAllLocations(data); // set locations data with data received
        setFilteredLocations(data.slice(0, 50)); // set to first first locations
      } catch (error) {
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // filter locations based on query
  const searchLocations = (query: string) => {
    if (!query) {
      setFilteredLocations(allLocations.slice(0, 50)); // set to the first fifty locations
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
