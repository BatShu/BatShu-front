import { Button, Modal, Skeleton, css } from "@mui/material";
import { ReactElement, useState } from "react";
interface ImageOrVideoProps {
  src: string;
  className?: string;
}
export const ImageOrVideo = ({
  src,
  className,
}: ImageOrVideoProps): ReactElement => {
  const getFileType = (filePath: string): string => {
    // 확장자를 추출합니다
    const extension = filePath.split(".").pop()?.toLowerCase() ?? "";

    // 이미지 확장자 목록
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
    // 비디오 확장자 목록
    const videoExtensions = ["mp4", "mov", "wmv", "flv", "avi", "mkv", "webm"];

    // 확장자에 따라 파일 타입을 결정합니다
    if (imageExtensions.includes(extension)) {
      return "image";
    } else if (videoExtensions.includes(extension)) {
      return "video";
    } else {
      return "unknown"; // 알 수 없는 파일 타입
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const fileType = getFileType(src);
  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        css={styles.modal}
      >
        <>
          {fileType == "image" && <img src={src} css={styles.modalImage} />}
          {fileType == "video" && (
            <video src={src} css={styles.modalImage} controls />
          )}
          {fileType == "unknown" && (
            <Skeleton variant="rectangular" css={styles.modalImage} />
          )}
        </>
      </Modal>
      <Button onClick={() => setModalOpen(true)}>
        {fileType == "image" && <img src={src} className={className} />}
        {fileType == "video" && (
          <video
            src={src}
            className={className}
            controls
            controlsList="nofullscreen"
          />
        )}
        {fileType == "unknown" && (
          <Skeleton variant="rectangular" className={className} />
        )}
      </Button>
    </>
  );
};

const styles = {
  modal: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 64px;
  `,
  modalImage: css`
    width: 100%;
    object-fit: contain;
  `,
};
