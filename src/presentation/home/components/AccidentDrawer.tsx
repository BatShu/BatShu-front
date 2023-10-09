import dayjs from "dayjs";
// styles
import { Box, Divider, SwipeableDrawer, Typography, css } from "@mui/material";
// hooks
import { useReadAccidentById } from "@/data/hooks/accident";
// constants
import { DATE_FORMAT_SEARCH } from "@/presentation/configs";
// component
import AppButton from "@/presentation/common/components/AppButton";

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
  const { accidentTime, photos, accidentlocation, createdTime } = dummyData;

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
            <Box className="status">● 요청중</Box>
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
              <Box css={styles.chip}>{accidentTime}</Box>
              <Box css={styles.chip}>{accidentlocation.x}</Box>
            </Box>
          </Box>

          <Box className="content">
            <AppButton css={[styles.button, styles.detail]}>
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
    "& .middle": { padding: "12px 0 30px 0" },
    "& .accident-image": {
      height: 140,
      aspectRatio: "1",
      borderRadius: "10px",
    },
    "& .info": {
      display: "flex",
      maxWidth: "60%",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingLeft: "25px",
      "& .car-number": { color: "#fff", backgroundColor: "#000" },
    },
  }),
  chip: css({
    ":not(.car-number)": { width: "fit-content" },
    fontSize: "16px",
    fontWeight: 500,
    color: "#808080",
    backgroundColor: "#F5F5F5",
    borderRadius: "12px",
    padding: "6px 24px",
  }),
  "& .detail": css({
    color: "#000",
    backgroundColor: "#fff",
    border: "2px solid #000",
  }),
  button: css({
    width: "49%",
  }),
  detail: css({
    color: "#000",
    backgroundColor: "#fff",
    border: "1.5px solid #000",
    "&:hover": {
      backgroundColor: "inherit",
    },
  }),
};

const dummyData = {
  id: 1,
  author: {
    uid: "0",
    email: "[이메일]",
    displayName: "0번 유",
    photoURL: "[프로필 사진 url]",
  },
  contentTitle: "게시글 제목",
  contentDescription: "게시글 내용",
  photos: [
    "https://images.unsplash.com/photo-1682686581362-796145f0e123",
    "https://images.unsplash.com/photo-1694481348806-0b6de4934812",
  ],
  accidentTime: "사고 시간",
  accidentlocation: {
    x: 127.02877138902706,
    y: 37.553756043633705,
    level: 1,
  },
  createdTime: "Thu Sep 14 2023 18:00:41 GMT+0900 (한국 표준시)",
};
