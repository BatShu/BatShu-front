import { Accident } from "@/domain/models/accident";
import AppButton from "@/presentation/common/components/AppButton";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DetailAccidentImage from "../components/DetailAccidentImage";
import { AccidentDetailChips } from "../components/DetailChips";
import DetailContent from "../components/DetailContent";
import DetailLocation from "../components/DetailLocation";
import DetailUserInfo, {
  DetailUserInfoSkeleton,
} from "../components/DetailUserInfo";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { useKakaoMapAddressSearch } from "@/hooks/useKakaoMapSearch";
import { useReadUserById } from "@/data/hooks/user";
import { useCreateRoomMutation } from "@/data/hooks/chat";
import { enqueueSnackbar } from "notistack";

interface AccidentDetailPageProps {
  accident: Accident;
}
export const AccdientDetailPage = ({ accident }: AccidentDetailPageProps) => {
  const navigate = useNavigate();
  const { data: author } = useReadUserById(accident.uid);
  const { data: addressData } = useKakaoMapAddressSearch({
    lat: accident.accidentLocation.y,
    lng: accident.accidentLocation.x,
  });

  const { mutateAsync, isLoading } = useCreateRoomMutation();

  const handleConnectChat = async () => {
    mutateAsync({
      id: accident.id,
      isAccident: true,
    })
      .catch((e) => {
        enqueueSnackbar(e.message, { variant: "error" });
      })
      .then((data) => {
        if (!data) {
          return;
        }
        navigate(`/chat/${data.roomId}`);
      });
  };

  const placeName = addressData?.address_name ?? "주소를 불러오는 중입니다.";

  return (
    <Box css={pageContentStyles}>
      <Left1 onClick={() => navigate(-1)} css={css(`cursor:pointer;`)} />

      <Box css={styles.container}>
        {author ? (
          <DetailUserInfo author={author} />
        ) : (
          <DetailUserInfoSkeleton />
        )}

        <DetailAccidentImage photos={accident.photoUrls} />

        <AccidentDetailChips accident={accident} />

        <DetailContent data={accident} />

        <DetailLocation
          location={accident.accidentLocation}
          placeName={placeName}
        />
      </Box>

      <AppButton onClick={handleConnectChat} loading={isLoading}>
        제보하기
      </AppButton>
    </Box>
  );
};
const styles = {
  container: css({ paddingTop: 20, overflow: "scroll" }),
};
