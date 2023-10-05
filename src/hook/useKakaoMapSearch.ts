import { useQuery } from "@tanstack/react-query";

const useKakaoMapSearch = (keyword: string) => {
  return useQuery({
    queryKey: ["kakaoMapSearch", keyword],
    queryFn: async () => {
      const placesSearchCB = (
        data: kakao.maps.services.PlacesSearchResult,
        status: kakao.maps.services.Status
      ) => {
        if (status === kakao.maps.services.Status.OK) {
          return data;
        }
        throw new Error("검색 결과가 없습니다.");
      };
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, placesSearchCB);
    },
  });
};

export default useKakaoMapSearch;
