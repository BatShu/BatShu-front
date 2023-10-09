import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
// styles
import { Box, Divider, SwipeableDrawer, Typography, css } from "@mui/material";
// icons
import { ReactComponent as TimeCircle2 } from "@/presentation/common/icons/outlined/Time Circle 2.svg";
import { ReactComponent as Frame36 } from "@/presentation/common/icons/outlined/Frame 36.svg";
// constants
import { DATE_FORMAT_SEARCH } from "@/presentation/configs";
// component
import AppButton from "@/presentation/common/components/AppButton";
// delete
import { dummyDetail } from "../temp";

interface AccidentDrawerProps {
  accidentId: number | null;
  onOpen?: () => void;
  onClose: () => void;
}

const AccidentDrawer = ({
  accidentId,
  onOpen,
  onClose,
}: AccidentDrawerProps) => {
  // useReadAccidentById(accidentId);
  const { accidentTime, photos, createdTime } = dummyDetail;
  const router = useNavigate();

  const routeToDetail = () => {
    router(`/detail/${accidentId}`, { state: { dummyDetail } });
  };
  return (
    <SwipeableDrawer
      open={!!accidentId}
      onOpen={onOpen ?? onClose}
      anchor="bottom"
      onClose={onClose}
      swipeAreaWidth={444}
      disableSwipeToOpen
    >
      <Box css={styles.drawer}>
        <Divider css={styles.divider} />
        <Box css={styles.contentWrapper}>
          <Box className="content">
            <Typography className="status">● 요청중</Typography>
            <Box className="date">
              {dayjs(createdTime).format(DATE_FORMAT_SEARCH)}
            </Box>
          </Box>

          <Box className="content middle">
            <img className="accident-image" src={photos[0]} />
            <Box className="info">
              <Box css={styles.chip} className="car-number">
                <Typography css={css(`font-size:8px`)}>DB소나타</Typography>
                <Typography css={css(`font-size:18px;font-weight:bold;`)}>
                  60마 8888
                </Typography>
              </Box>
              <Box css={styles.chip}>
                <TimeCircle2 css={styles.icon} />
                {accidentTime}
              </Box>
              <Box css={styles.chip}>
                <Frame36 css={styles.icon} />
                종각역 3번출구
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
            <AppButton css={styles.button}>제보하기</AppButton>
          </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default AccidentDrawer;

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
  divider: css({ width: 52, height: 2.5, backgroundColor: "#EEEDED" }),
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
      "& .status": { color: "#68CCE2" },
      "& .date": { color: "#C2C2C2" },
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
        color: "#fff",
        backgroundColor: "#000",
      },
    },
  }),
  chip: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    ":not(.car-number)": { width: "fit-content" },
    fontSize: "14px",
    fontWeight: 500,
    color: "#808080",
    backgroundColor: "#F5F5F5",
    borderRadius: "12px",
    padding: "6px 15px",
  }),
  icon: css({ width: "18px", marginRight: "5px" }),
  "& .detail": css({
    color: "#000",
    backgroundColor: "#fff",
    border: "2px solid #000",
  }),
  button: css({ width: "49%" }),
  detail: css({
    color: "#000",
    backgroundColor: "#fff",
    border: "1.5px solid #000",
    "&:hover": { backgroundColor: "inherit" },
  }),
};
