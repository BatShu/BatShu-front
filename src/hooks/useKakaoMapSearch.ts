import { ILocation } from "@/domain/models/location";
import { useQuery } from "@tanstack/react-query";

const useKakaoMapSearch = (keyword: string) => {
  return useQuery<kakao.maps.services.PlacesSearchResult>({
    queryKey: ["kakaoMapSearch", keyword],
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(data);
          }
          reject("검색 결과가 없습니다.");
        });
      });
    },
  });
};

export const useKakaoMapAddressSearch = (
  location: Pick<ILocation, "lat" | "lng"> | null
) => {
  return useQuery<kakao.maps.services.Address>({
    queryKey: ["kakaoMapAdressSearch", location?.lat, location?.lng],
    queryFn: async () => {
      if (location == null) {
        throw new Error("location is null");
      }
      const geoEncoder = new kakao.maps.services.Geocoder();
      return new Promise((resolve, reject) => {
        geoEncoder.coord2Address(location.lng, location.lat, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(data[0].address);
          }
          reject("검색 결과가 없습니다.");
        });
      });
    },
  });
};
export default useKakaoMapSearch;
