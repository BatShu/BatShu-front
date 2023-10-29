import { Observe } from "@/domain/models/observe";
import AppButton from "@/presentation/common/components/AppButton";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { dummyDetail } from "@/presentation/home/temp";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import DetailAccidentImage from "../components/DetailAccidentImage";
import DetailChips from "../components/DetailChips";
import DetailContent from "../components/DetailContent";
import DetailLocation from "../components/DetailLocation";
import DetailUserInfo from "../components/DetailUserInfo";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { useNavigate } from "react-router-dom";
import { useKakaoMapAddressSearch } from "@/hooks/useKakaoMapSearch";
interface ObserveDetailPageProps {
  observe: Observe;
}
export const ObserveDetailPage = ({ observe }: ObserveDetailPageProps) => {
  const navigate = useNavigate();
  const { data: addressData } = useKakaoMapAddressSearch({
    lat: observe.observeLocation.y,
    lng: observe.observeLocation.x,
  });

  const placeName = addressData?.address_name ?? "주소를 불러오는 중입니다.";
  // TODO: delete
  const tempAuthor = {
    uid: "0",
    email: "[이메일]",
    displayName: "마라탕 좋아",
    photoURL: "https://images.unsplash.com/photo-1682686581362-796145f0e123",
  };

  // TODO: 목격글 사고글 분기
  return (
    <Box css={pageContentStyles}>
      <Left1 onClick={() => navigate(-1)} css={css(`cursor:pointer;`)} />

      <Box css={styles.container}>
        <DetailUserInfo author={tempAuthor} />

        <DetailAccidentImage photos={[observe.thumbnailUrl]} />

        <DetailChips data={dummyDetail} />

        <DetailContent data={dummyDetail} />

        <DetailLocation
          accidentLocation={observe.observeLocation}
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
