import { useState, useEffect } from "react";

const useKakaoMapSearch = (keyword: string) => {
  const [result, setResult] = useState<kakao.maps.services.PlacesSearchResult>(
    []
  );
  const [searchError, setSearchError] = useState<boolean>(true);

  useEffect(() => {
    if (keyword === "") return;

    const placesSearchCB = (
      data: kakao.maps.services.PlacesSearchResult,
      status: kakao.maps.services.Status
    ) => {
      if (status === kakao.maps.services.Status.OK) {
        setResult(data);
        setSearchError(false);
      } else setSearchError(true);
    };
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, placesSearchCB);
  }, [keyword]);

  return { result, searchError };
};

export default useKakaoMapSearch;
