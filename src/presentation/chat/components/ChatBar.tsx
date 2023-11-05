import { Box, Button, css } from "@mui/material";
import { ReactElement, useRef } from "react";
import { ReactComponent as SendIcon } from "@/presentation/common/icons/outlined/Send 3.svg";
import { ReactComponent as ImageIcon } from "@/presentation/common/icons/outlined/Image.svg";
import { ReactComponent as PasswordIcon } from "@/presentation/common/icons/outlined/Password 1.svg";
import { SocketRepository } from "@/data/backend/socket";
import { useAuthStore } from "@/store/authStore";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import { SendMessageDto } from "@/domain/dtos/socket";
interface ChatBarProps {
  roomId: number;
  socketRepository: SocketRepository;
}

const useSendMutation = (socketRepository: SocketRepository) => {
  return useMutation({
    mutationFn: async (dto: SendMessageDto) => {
      socketRepository.sendMessage(dto);
    },
  });
};

export const ChatBar = ({
  roomId,
  socketRepository,
}: ChatBarProps): ReactElement => {
  const ref = useRef<HTMLInputElement>(null);
  const { appUser } = useAuthStore();
  const { mutateAsync, isLoading } = useSendMutation(socketRepository);
  if (appUser == null) {
    throw new Error("appUser is null");
  }
  const handleSendMessage = () => {
    if (ref.current == null) return;
    const message = ref.current.value;
    if (message == null || message == "") return;
    mutateAsync({
      message,
      sendUserUid: appUser.uid,
      roomId: roomId,
    });
    ref.current.value = "";
  };
  return (
    <Box css={styles.barContainer}>
      <Box css={styles.actionsContainer}>
        <Button css={styles.actionButton}>
          <ImageIcon />
          자료 보내기
        </Button>
        <Button css={styles.actionButton}>
          <PasswordIcon />
          계좌 보내기
        </Button>
      </Box>
      <input
        placeholder="메시지를 입력해주세요!"
        css={styles.textField}
        ref={ref}
      />
      <LoadingButton
        css={styles.sendButton}
        loading={isLoading}
        onClick={handleSendMessage}
      >
        <SendIcon />
      </LoadingButton>
    </Box>
  );
};

const styles = {
  actionsContainer: css`
    position: absolute;
    top: -64px;
    left: 0;
    width: 100%;
    padding: 0 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    height: 72px;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.41px;
  `,
  actionButton: css`
    display: inline-flex;
    padding: 6px 14px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid var(--white-outline, #f2f2f2);
    background: #fff;
    &:hover {
      background-color: #f2f2f2;
    }
    color: #787878;
  `,
  barContainer: css`
    width: 100%;
    background-color: #ffffff;
    padding: 9px 25px 25px 25px;
    position: relative;

    display: flex;
    gap: 12px;
  `,
  textField: css`
    width: 100%;
    border-radius: 8px;
    background: #f9f9f9;
    display: flex;
    height: 36px;
    padding: 9px 127px 8px 18px;
    align-items: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.41px;
    border: none;
    ::placeholder {
      color: #e2e2e2;
    }

    &:focus {
      outline: none;
    }
  `,
  sendButton: css`
    display: flex;
    width: 52px;
    height: 36px;
    padding: 6px 14px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 8px;
    background: #000;
    color: #fff;
    /* button */
    box-shadow: 4px 4px 6px 0px rgba(161, 161, 161, 0.03);

    &:hover {
      background-color: #1d1d1d;
    }
  `,
};
