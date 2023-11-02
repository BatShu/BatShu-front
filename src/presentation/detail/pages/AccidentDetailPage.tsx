import { Accident } from "@/domain/models/accident";
import AppButton from "@/presentation/common/components/AppButton";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DetailAccidentImage from "../components/DetailAccidentImage";
import DetailChips from "../components/DetailChips";
import DetailContent from "../components/DetailContent";
import DetailLocation from "../components/DetailLocation";
import DetailUserInfo from "../components/DetailUserInfo";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { useKakaoMapAddressSearch } from "@/hooks/useKakaoMapSearch";

interface AccidentDetailPageProps {
  accident: Accident;
}
export const AccdientDetailPage = ({ accident }: AccidentDetailPageProps) => {
  const navigate = useNavigate();
  const { data: addressData } = useKakaoMapAddressSearch({
    lat: accident.accidentLocation.y,
    lng: accident.accidentLocation.x,
  });

  const placeName = addressData?.address_name ?? "주소를 불러오는 중입니다.";

  // TODO: 목격글 사고글 분기
  return (
    <Box css={pageContentStyles}>
      <Left1 onClick={() => navigate(-1)} css={css(`cursor:pointer;`)} />

      <Box css={styles.container}>
        <DetailUserInfo
          displayName={accident.displayName}
          photoURL={accident.googleProfilePhotoUrl}
        />

        <DetailAccidentImage photos={accident.photoUrls} />

        <DetailChips accident={accident} />

        <DetailContent data={accident} />

        <DetailLocation
          accidentLocation={accident.accidentLocation}
          placeName={placeName}
        />
      </Box>

      {/* TODO: 채팅 연결 */}
      <AppButton>제보하기</AppButton>
    </Box>
  );
};
const styles = {
  container: css({ paddingTop: 20, overflow: "scroll" }),
};
