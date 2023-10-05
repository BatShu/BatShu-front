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

export default useKakaoMapSearch;
