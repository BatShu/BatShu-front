import { CssObject } from "@/presentation/common/styles/types";
import { Box, Typography, css } from "@mui/material";
import { TPlace } from "@/store/locationStore";
import useKakaoMapSearch from "@/hooks/useKakaoMapSearch";

interface PlaceResultProps {
  keyword: string;
  onPlaceSelected: (place: TPlace | null) => void;
  top?: number;
}

const PlaceResult = ({
  keyword,
  onPlaceSelected: onPlaceSelected,
  top = 0,
}: PlaceResultProps) => {
  const { data: result } = useKakaoMapSearch(keyword);
  if (!result) return null;
  return (
    <Box css={styles.container} top={top}>
      {result.map((place) => (
        <Box
          key={place.id}
          css={styles.content}
          onClick={() => onPlaceSelected(place)}
        >
          <Typography css={styles.place}> {place.place_name}</Typography>
          <Typography css={styles.address}> {place.address_name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PlaceResult;

const styles: CssObject = {
  container: css({
    position: "absolute",
    width: "100%",
    left: 0,
    maxHeight: "12rem",
    backgroundColor: "#fff",
    zIndex: 10,
    overflow: "scroll",
    border: "1px solid #CCCCCC",
    borderRadius: "8px",
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "60px",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #CCCCCC",
    cursor: "pointer",
  }),
  place: css({
    color: "#000",
    fontSize: "16px",
    fontWeight: 600,
  }),
  address: css({
    fontSize: "11px",
  }),
};
