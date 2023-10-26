import { useLocation, useNavigate } from "react-router-dom";
// styles
import { Box, css } from "@mui/material";
import { pageContentStyles } from "../common/styles/pageStyles";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
// types
import { dummyDetail } from "../home/temp";
// components
import DetailUserInfo from "./components/DetailUserInfo";
import DetailAccidentImage from "./components/DetailAccidentImage";
import DetailChips from "./components/DetailChips";
import DetailContent from "./components/DetailContent";
import DetailLocation from "./components/DetailLocation";
import AppButton from "../common/components/AppButton";

export const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { photoUrls, accidentLocation } = location.state
    .dummyDetail as typeof dummyDetail;

  const { placeName } = location.state;

  // TODO: delete
  const tempAuthor = {
    uid: "0",
    email: "[이메일]",
    displayName: "마라탕 좋아",
    photoURL: "https://images.unsplash.com/photo-1682686581362-796145f0e123",
  };

  const onClick = async () => {
    console.log("onClick");
  };

  // TODO: 목격글 사고글 분기
  return (
    <Box css={pageContentStyles}>
      <Left1 onClick={() => navigate(-1)} css={css(`cursor:pointer;`)} />

      <Box css={styles.container}>
        <DetailUserInfo author={tempAuthor} />

        <DetailAccidentImage photos={photoUrls} />

        <DetailChips data={dummyDetail} />

        <DetailContent data={dummyDetail} />

        <DetailLocation
          accidentLocation={accidentLocation}
          placeName={placeName}
        />
      </Box>

      {/* TODO: 채팅 연결 */}
      <AppButton onClick={onClick}>제보하기</AppButton>
    </Box>
  );
};

const styles = {
  container: css({ paddingTop: 20, overflow: "scroll" }),
};
