export type TPlace = kakao.maps.services.PlacesSearchResultItem;
/**
 * @param lat 위도 (y)
 * @param lng 경도 (x)
 */
export interface ILocation {
  lat: number;
  lng: number;
  level: number;
  place: TPlace | null;
}
