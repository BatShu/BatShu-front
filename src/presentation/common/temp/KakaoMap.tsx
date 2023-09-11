import { CSSProperties } from "react";
import { Map } from "react-kakao-maps-sdk";
// hooks
import useUserLocation from "@/hook/useUserLocation";

const KakaoMap = () => {
  const {
    location: { lat, lng },
  } = useUserLocation();

  return <Map center={{ lat, lng }} level={4} style={styles.map}></Map>;
};

export default KakaoMap;

const styles: { [key: string]: CSSProperties } = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -999,
  },
};
