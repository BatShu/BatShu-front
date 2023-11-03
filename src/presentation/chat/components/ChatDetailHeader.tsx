import { Box, IconButton, Skeleton, Typography, css } from "@mui/material";
import { ReactElement, useState } from "react";
import { ReactComponent as BackIcon } from "@/presentation/common/icons/outlined/Left 1.svg";
import { ReactComponent as MoreIcon } from "@/presentation/common/icons/outlined/Menu Meatballs.svg";
import { ReactComponent as DownIcon } from "@/presentation/common/icons/outlined/Down 2.svg";
import { ReactComponent as CalenderIcon } from "@/presentation/common/icons/outlined/Calender 1.svg";
import { ReactComponent as LocationIcon } from "@/presentation/common/icons/outlined/Location.svg";
import { ReactComponent as CarIcon } from "@/presentation/common/icons/asset/Car.svg";
import { Incident, isAccident } from "@/domain/models/incident";
import dayjs from "dayjs";
import { useKakaoMapAddressSearch } from "@/hooks/useKakaoMapSearch";

interface ChatDetailHeaderProps {
  incident: Incident;
}
export const ChatDetailHeader = ({
  incident,
}: ChatDetailHeaderProps): ReactElement => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDetailOpen = () => {
    setIsDetailOpen(!isDetailOpen);
  };
  return (
    <Box css={styles.headerContainer}>
      <Box css={styles.toolbarContainer}>
        <IconButton css={styles.icon}>
          <BackIcon />
        </IconButton>
        <IconButton css={styles.icon}>
          <MoreIcon />
        </IconButton>
      </Box>
      <Box css={styles.subbarContainer}>
        <Typography css={styles.title}>{incident.contentTitle}</Typography>
        <IconButton
          css={[styles.icon, styles.rotateIcon(isDetailOpen)]}
          onClick={handleDetailOpen}
        >
          <DownIcon />
        </IconButton>
      </Box>
      {isDetailOpen && <CommonChips incident={incident} />}
    </Box>
  );
};

export const ChatDetailHeaderSkeleton = (): ReactElement => {
  return (
    <Box css={styles.headerContainer}>
      <Box css={styles.toolbarContainer}>
        <IconButton css={styles.icon}>
          <BackIcon />
        </IconButton>
        <IconButton css={styles.icon}>
          <MoreIcon />
        </IconButton>
      </Box>
      <Box css={styles.subbarContainer}>
        <Skeleton css={styles.title} />
        <IconButton css={styles.icon}>
          <DownIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const CommonChips = ({ incident }: ChatDetailHeaderProps): ReactElement => {
  const date = isAccident(incident)
    ? incident.accidentTime[1]
    : incident.observeEndTime;

  const location = isAccident(incident)
    ? incident.accidentLocation
    : incident.observeLocation;

  const { data: locationName } = useKakaoMapAddressSearch({
    lng: location.x,
    lat: location.y,
  });
  const toFormat = (date: string) => {
    return dayjs(date).format("YYYY.MM.DD");
  };
  return (
    <Box css={styles.chipsSurface}>
      <Box css={styles.chipsContainer}>
        <Box css={[styles.chip, styles.whiteChip]}>
          <CalenderIcon />
          <Typography>{toFormat(date)}</Typography>
        </Box>
        <Box css={[styles.chip, styles.whiteChip]}>
          <LocationIcon />
          <Typography>{locationName?.address_name}</Typography>
        </Box>
      </Box>
      <Box css={styles.chipsContainer}>
        <Box css={[styles.chip, styles.blackChip]}>
          <CarIcon />
          <Typography css={styles.chipTypo}>
            {incident.carModelName}
            <Box css={styles.dot} />
            {incident.licensePlate}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  headerContainer: css`
    padding: 20px 12px;
    display: flex;
    gap: 18px;
    flex-direction: column;
    background-color: #fff;
  `,
  toolbarContainer: css`
    display: flex;
    justify-content: space-between;
  `,
  icon: css`
    color: black;
  `,
  rotateIcon: (rotate: boolean) => css`
    transform: rotate(${rotate ? 180 : 0}deg);
    transition: transform 0.2s ease-in-out;
  `,
  subbarContainer: css`
    display: flex;
    justify-content: space-between;
    gap: 12px;
  `,
  title: css`
    padding-left: 8px;
    flex: 1;
    color: #787878;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.41px;
  `,
  chipsSurface: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  chipsContainer: css`
    display: flex;
    flex-direction: row;
    gap: 12px;
  `,
  chip: css`
    width: fit-content;
    display: inline-flex;
    padding: 4px 10px;
    flex-direction: row;
    align-items: flex-start;
    gap: 5px;
    border-radius: 8px;
    border: 1px solid #eee;
    box-shadow: 4px 4px 6px 0px rgba(75, 75, 75, 0.03);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.41px;
  `,
  whiteChip: css`
    background: #fff;
    color: #787878;
  `,
  blackChip: css`
    background: #000;
    color: #fff;
  `,
  chipTypo: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
  `,
  dot: css`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #d1d1d1;
  `,
};
