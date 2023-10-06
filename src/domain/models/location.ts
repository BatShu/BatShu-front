export type TPlace = kakao.maps.services.PlacesSearchResultItem;
/**
 * @param y 위도 (latitude)
 * @param x 경도 (longitude)
 */
export interface ILocation {
  y: number;
  x: number;
  level: number;
  place: TPlace | null;
}
