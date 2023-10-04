import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
// styles
import { Box, css } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { sliderSettings } from "@/presentation/configs";
// store
import { writeFormStore } from "@/store/writeFormStore";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
// components
import SelectType from "./components/SelectType";
import Dots from "./components/Dots";
import Detail from "./components/Detail";
import SearchMap from "./components/SearchMap";

export const WritePage = () => {
  const [curPage, setCurPage] = useState(0);
  const [showMap, setShowMap] = useState(false);

  const { type, title, licensePlate, accidentTime, content } = writeFormStore();

  const sliderRef = useRef<Slider>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // TODO: 사고등록 API
    console.log(type);
    console.log(title);
    console.log(licensePlate);
    console.log(accidentTime);
    console.log(content);
  }, [type, title, licensePlate, accidentTime, content]);

  return (
    <Box css={styles.pageWrapper}>
      {showMap && <SearchMap setShowMap={setShowMap} />}

      <Box css={pageContentStyles}>
        <Box css={styles.container}>
          <Box css={styles.topArea}>
            <Left1
              onClick={() => {
                curPage === 0 ? navigate(-1) : sliderRef.current?.slickGoTo(0);
              }}
              css={css(`cursor:pointer;z-index:1`)}
            />
            <Dots curPage={curPage} />
          </Box>

          <Box css={styles.contentWrapper}>
            <Slider
              {...sliderSettings}
              ref={sliderRef}
              css={styles.slider}
              beforeChange={(_, next) => setCurPage(next)}
            >
              <Box css={styles.content}>
                <SelectType sliderRef={sliderRef} />
              </Box>

              <Box css={styles.content}>
                <Detail setShowMap={setShowMap} />
              </Box>
            </Slider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles: CssObject = {
  pageWrapper: css({
    position: "relative",
    height: "100vh",
    backgroundColor: "var(--background)",
  }),
  container: css({ position: "relative", width: "100%", height: "100%" }),
  topArea: css({ display: "flex" }),
  contentWrapper: css({
    height: "100%",
    "& .slick-slider, .slick-list, .slick-track, .slick-slide, .slick-slide > div":
      {
        height: "100%",
      },
  }),
  content: css({
    display: "flex !important",
    position: "relative",
    height: "100%",
    flexDirection: "column",
    paddingTop: "30px",
  }),
};
