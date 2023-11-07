import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
// styles
import { Box, Divider, SwipeableDrawer, Typography, css } from "@mui/material";
// icons
import { ReactComponent as TimeCircle2 } from "@/presentation/common/icons/outlined/Time Circle 2.svg";
import { ReactComponent as Frame36 } from "@/presentation/common/icons/outlined/Frame 36.svg";
// hooks
import { useKakaoMapAddressSearch } from "@/hooks/useKakaoMapSearch";
// constants
import { DATE_FORMAT_DETAIL_CHIP } from "@/presentation/configs";
// component
import AppButton from "@/presentation/common/components/AppButton";
import { useReadObserveById } from "@/data/hooks/accidentObserve";
import { Observe } from "@/domain/models/observe";
import { useCreateRoomMutation } from "@/data/hooks/chat";
import { enqueueSnackbar } from "notistack";

interface ObserveDrawerProps {
  observeId: number | null;
  onOpen?: () => void;
  onClose: () => void;
}

const ObserveDrawer = ({ observeId, onOpen, onClose }: ObserveDrawerProps) => {
  const { data: observe } = useReadObserveById(observeId);

  return (
    <SwipeableDrawer
      open={!!observeId}
      onOpen={onOpen ?? onClose}
      anchor="bottom"
      onClose={onClose}
      swipeAreaWidth={444}
      disableSwipeToOpen
    >
      {observe && <ObserveDrawerDetail observe={observe} />}
    </SwipeableDrawer>
  );
};

const ObserveDrawerDetail = ({ observe }: { observe: Observe }) => {
  const navigate = useNavigate();

  const { data: addressData } = useKakaoMapAddressSearch({
    lat: observe.observeLocation.y,
    lng: observe.observeLocation.x,
  });

  const addressName = addressData?.address_name ?? "주소를 불러오는 중입니다.";
  const {
    createdAt,
    thumbnailUrl,
    carModelName,
    licensePlate,
    observeEndTime,
  } = observe;

  const { mutateAsync, isLoading } = useCreateRoomMutation();

  const handleConnectChat = async () => {
    mutateAsync({
      id: observe.videoId,
      isAccident: false,
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
  const routeToDetail = () => {
    navigate(`/observe/${observe.videoId}`, {
      state: { ...observe, placeName: addressName },
    });
  };
  return (
    <Box css={styles.drawer}>
      <Divider css={styles.divider} />
      <Box css={styles.contentWrapper}>
        <Box className="content">
          <Typography className="status">● 요청중</Typography>
          <Typography className="date">{createdAt.split("T")[0]}</Typography>
        </Box>

        <Box className="content middle">
          <img className="accident-image" src={thumbnailUrl} />
          <Box className="info">
            <Box css={styles.chip} className="car-number">
              <Typography css={css(`font-size:10px`)}>
                {carModelName}
              </Typography>
              <Typography css={css(`font-size:20px;font-weight:bold;`)}>
                {licensePlate}
              </Typography>
            </Box>

            <Box css={[styles.chip, css(`width:fit-content;`)]}>
              <TimeCircle2 css={styles.icon} />
              <span>
                {dayjs(observeEndTime).format(DATE_FORMAT_DETAIL_CHIP)}
              </span>
            </Box>

            <Box css={styles.chip}>
              <Frame36 css={styles.icon} />
              <span>{addressName}</span>
            </Box>
          </Box>
        </Box>

        <Box className="content">
          <AppButton
            css={[styles.button, styles.detail]}
            onClick={routeToDetail}
          >
            자세히 보기
          </AppButton>
          <AppButton
            css={styles.button}
            onClick={handleConnectChat}
            loading={isLoading}
          >
            제보하기
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ObserveDrawer;

const styles = {
  drawer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
    height: "330px",
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  }),
  divider: css({
    width: 52,
    height: 2.5,
    backgroundColor: "#EEEDED",
    border: 0,
  }),
  contentWrapper: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "30px",
    "& .content": {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      fontSize: "12px",
      "& .status": { fontSize: "12px", color: "#68CCE2" },
      "& .date": { fontSize: "12px", color: "#C2C2C2" },
    },
    "& .middle": { justifyContent: "unset", padding: "12px 0 30px 0" },
    "& .accident-image": {
      width: 140,
      aspectRatio: "1",
      borderRadius: "10px",
    },
    "& .info": {
      display: "flex",
      flexDirection: "column",
      width: "50%",
      justifyContent: "space-between",
      paddingLeft: "25px",
      marginLeft: "auto",
      "& .car-number": {
        flexDirection: "column",
        padding: "6px 24px",
        color: "#fff",
        backgroundColor: "#000",
      },
    },
  }),
  chip: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 500,
    color: "#808080",
    backgroundColor: "#F5F5F5",
    borderRadius: "12px",
    padding: "6px 9px",
    minWidth: 0,
    maxWidth: "100%",
    "& span": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  }),
  icon: css({ flexShrink: 0, width: "18px", marginRight: "5px" }),
  "& .detail": css({
    color: "#000",
    backgroundColor: "#fff",
    border: "2px solid #000",
  }),
  button: css({ width: "48%" }),
  detail: css({
    color: "#000",
    backgroundColor: "#fff",
    border: "1.5px solid #000",
    "&:hover": { backgroundColor: "inherit" },
  }),
};
