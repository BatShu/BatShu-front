import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { SerializedStyles, css } from "@emotion/react";
// constants
import {
  CHAT_PATH,
  HOME_PATH,
  PROFILE_PATH,
  WRITE_PATH,
} from "@/domain/constants/paths";
// icons
import { ReactComponent as LogoIcon } from "@/presentation/common/icons/logo.svg";
import { ReactComponent as Message1Icon } from "@/presentation/common/icons/outlined/Message 1.svg";
import { ReactComponent as PenIcon } from "@/presentation/common/icons/outlined/Pen.svg";
import { ReactComponent as InstagramIcon } from "@/presentation/common/icons/outlined/Instagram.svg";
import { ReactComponent as ProfileSquareIcon } from "@/presentation/common/icons/outlined/Profile Square.svg";

const AppNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <BottomNavigation
      showLabels
      css={css({
        borderRadius: 8,
        background: "#fff",
        boxShadow: "4px 4px 6px 0px rgba(161, 161, 161, 0.03)",
      })}
      value={location.pathname}
    >
      <BottomNavigationAction
        label="홈"
        value={HOME_PATH}
        icon={<LogoIcon />}
        css={actionStyles}
        onClick={() => navigate(HOME_PATH)}
      />
      <BottomNavigationAction
        label="채팅"
        value={CHAT_PATH}
        icon={<Message1Icon />}
        css={actionStyles}
        onClick={() => navigate(CHAT_PATH)}
      />
      <BottomNavigationAction
        label="글쓰기"
        value={WRITE_PATH}
        icon={<PenIcon />}
        css={actionStyles}
        onClick={() => navigate(WRITE_PATH)}
      />
      <BottomNavigationAction
        label="커뮤니티"
        icon={<InstagramIcon />}
        css={actionStyles}
      />
      <BottomNavigationAction
        label="프로필"
        value={PROFILE_PATH}
        icon={<ProfileSquareIcon />}
        css={actionStyles}
        onClick={() => navigate(PROFILE_PATH)}
      />
    </BottomNavigation>
  );
};

export default AppNavigationBar;

const actionStyles: SerializedStyles = css({
  color: "#c1c1c1",
  fontFamily: "Pretendard",
  fontSize: 12,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  width: "100%",
  minWidth: 0,
  maxWidth: "100%",
  svg: {
    color: "#c1c1c1",
  },
  ":active, &.Mui-selected": {
    color: "#000",
    svg: {
      color: "#000",
    },
  },
});
