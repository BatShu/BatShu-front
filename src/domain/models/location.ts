export interface AppLocation {
  x: number;
  y: number;
  level?: number;
}
export type TPlace = kakao.maps.services.PlacesSearchResultItem;
export interface ILocation {
  lat: number;
  lng: number;
  level: number;
  place: TPlace | null;
}
