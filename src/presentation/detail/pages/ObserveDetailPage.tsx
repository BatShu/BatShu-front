import { Observe } from "@/domain/models/observe";
import AppButton from "@/presentation/common/components/AppButton";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { css } from "@emotion/react";
import { Box } from "@mui/material";
import DetailAccidentImage from "../components/DetailAccidentImage";
import { ObserveDetailChips } from "../components/DetailChips";
import DetailContent from "../components/DetailContent";
import DetailLocation from "../components/DetailLocation";
import DetailUserInfo, {
  DetailUserInfoSkeleton,
} from "../components/DetailUserInfo";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { useNavigate } from "react-router-dom";
import { useKakaoMapAddressSearch } from "@/hooks/useKakaoMapSearch";
import { useReadUserById } from "@/data/hooks/user";
import { useCreateRoomMutation } from "@/data/hooks/chat";
interface ObserveDetailPageProps {
  observe: Observe;
}
export const ObserveDetailPage = ({ observe }: ObserveDetailPageProps) => {
  const navigate = useNavigate();
  const { data: author } = useReadUserById(observe.uid);
  const { data: addressData } = useKakaoMapAddressSearch({
    lat: observe.observeLocation.y,
    lng: observe.observeLocation.x,
  });

  const placeName = addressData?.address_name ?? "주소를 불러오는 중입니다.";
  const { mutateAsync, isLoading } = useCreateRoomMutation();

  const handleConnectChat = async () => {
    const data = await mutateAsync({
      id: observe.videoId,
      isAccident: false,
    });
    navigate(`/chat/${data.roomId}`);
  };

  return (
    <Box css={pageContentStyles}>
      <Left1 onClick={() => navigate(-1)} css={css(`cursor:pointer;`)} />

      <Box css={styles.container}>
        {author ? (
          <DetailUserInfo author={author} />
        ) : (
          <DetailUserInfoSkeleton />
        )}

        <DetailAccidentImage photos={[observe.thumbnailUrl]} />

        <ObserveDetailChips observe={observe} />

        <DetailContent data={observe} />

        <DetailLocation
          location={observe.observeLocation}
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
