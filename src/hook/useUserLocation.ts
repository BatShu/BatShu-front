import { useState, useEffect, useCallback } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState({ lat: 33.5563, lng: 126.79581 });
  const [error, setError] = useState(false);

  const successHandler: PositionCallback = useCallback((position) => {
    const { latitude: lat, longitude: lng } = position.coords;

    setLocation({ lat, lng });
    setError(false);
  }, []);

  const errorHandler: PositionErrorCallback = useCallback(() => {
    setError(true);
  }, []);

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError(true);
      return;
    }
    geolocation.getCurrentPosition(successHandler, errorHandler, {
      timeout: 5000,
    });
  }, [successHandler, errorHandler]);

  return { location, error };
}
