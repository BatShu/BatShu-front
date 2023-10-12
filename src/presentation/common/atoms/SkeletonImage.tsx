import { useState } from "react";
import { Skeleton } from "@mui/material";
import { Interpolation, Theme } from "@emotion/react";

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  variant?: "text" | "rectangular" | "rounded" | "circular";
  imgCss?: Interpolation<Theme>;
}

const SkeletonImage = ({
  src,
  variant = "rectangular",
  imgCss,
  ...rest
}: SkeletonImageProps) => {
  const [load, setLoad] = useState(false);

  const style = (load: boolean) => ({ ...(!load && { display: "none" }) });

  return (
    <>
      <Skeleton variant={variant} css={imgCss} style={style(!load)} />
      <img
        src={src}
        css={imgCss}
        onLoad={() => setLoad(true)}
        style={style(load)}
        {...rest}
      />
    </>
  );
};

export default SkeletonImage;
