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
import AppButton from "../common/components/AppButton";
import DetailLocation from "./components/DetailLocation";

export const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { author, photos, accidentlocation } = location.state
    .dummyDetail as typeof dummyDetail;

  // TODO: 목격글 사고글 분기해야함, 맵 미리보기 컴포넌트로
  return (
    <Box css={pageContentStyles}>
      <Left1 onClick={() => navigate(-1)} css={css(`cursor:pointer;`)} />

      <Box css={styles.container}>
        <DetailUserInfo author={author} />

        <DetailAccidentImage photos={photos} />

        <DetailChips data={dummyDetail} />

        <DetailContent data={dummyDetail} />

        <DetailLocation accidentLocation={accidentlocation} />
      </Box>

      {/* TODO: 채팅 연결 */}
      <AppButton>제보하기</AppButton>
    </Box>
  );
};

const styles = {
  container: css({ paddingTop: 20, overflow: "scroll" }),
};
