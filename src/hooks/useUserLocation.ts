import { locationStore } from "@/store/locationStore";
import { useEffect, useCallback } from "react";

export default function useUserLocation() {
  const { location, status, setLocation, setStatus } = locationStore();

  const successHandler: PositionCallback = useCallback(
    (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setLocation({ y: lat, x: lng, level: 3, place: null });
      setStatus({ loading: false, error: false });
    },
    [setLocation, setStatus]
  );

  const errorHandler: PositionErrorCallback = useCallback(() => {
    setStatus({ loading: false, error: true });
  }, [setStatus]);

  useEffect(() => {
    if (!status.loading) return;

    const { geolocation } = navigator;
    if (!geolocation) {
      setStatus({ loading: false, error: true });
      return;
    }
    geolocation.getCurrentPosition(successHandler, errorHandler, {
      timeout: 5000,
    });
  }, [status, setStatus, successHandler, errorHandler]);

  return { location, status };
}
