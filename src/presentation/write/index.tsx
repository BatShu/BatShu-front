import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FormProvider } from "react-hook-form";
// styles
import { Box, css } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { sliderSettings } from "@/presentation/configs";
// api
import { API } from "@/data/util/fetcher";
import { POST_ACCIDENT, POST_OBSERVE } from "@/domain/endpoint";
// store
import {
  useWriteForm,
  writeFormState,
} from "@/presentation/write/hooks/writeForm";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
// components
import SelectType from "./components/SelectType";
import DotsHeader from "./components/DotsHeader";
import Detail from "./components/Detail";

export const WritePage = () => {
  const [curPage, setCurPage] = useState(0);

  const details = useWriteForm();
  const handleSubmit = details.handleSubmit;
  const sliderRef = useRef<Slider>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: writeFormState) => {
    const { type, title, accidentTime, content, licensePlate } = data;
    console.log(data);

    const isAccident = type === "사고자";
    const endPoint = isAccident ? POST_ACCIDENT : POST_OBSERVE;

    const commonPayload = {
      contentTitle: title,
      contentDescription: content.description,
      placeName: content.placeName,
      carModelName: content.carModelName,
      licensePlate: licensePlate,
    };

    const formData = new FormData();

    (Object.keys(commonPayload) as (keyof typeof commonPayload)[]).forEach(
      (key) => formData.append(key, commonPayload[key])
    );

    const x = String(content.location?.lng);
    const y = String(content.location?.lat);

    if (isAccident) {
      formData.append("accidentTime", accidentTime[0]);
      formData.append("accidentTime", accidentTime[1]);
      formData.append("bounty", String(content.bounty));
      formData.append("accidentLocation[x]", x);
      formData.append("accidentLocation[y]", y);
      content.photos.forEach(({ file }) => {
        if (file) formData.append("photos", file);
      });
    } else {
      formData.append("observeTime", accidentTime[0]);
      formData.append("observeTime", accidentTime[1]);
      formData.append("observeLocation[x]", x);
      formData.append("observeLocation[y]", y);
      formData.append("videoId", "1");
    }

    // const res = await API.POST(endPoint, { body: formData });
    // console.log(res);
  };

  return (
    <FormProvider {...details}>
      <form
        css={styles.pageWrapper}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Box css={pageContentStyles}>
          <Box css={styles.container}>
            <Box css={styles.topArea}>
              <Left1
                onClick={() => {
                  curPage === 0
                    ? navigate(-1)
                    : sliderRef.current?.slickGoTo(0);
                }}
                css={css(`cursor:pointer;z-index:1`)}
              />
              <DotsHeader curPage={curPage} />
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
                  <Detail />
                </Box>
              </Slider>
            </Box>
          </Box>
        </Box>
      </form>
    </FormProvider>
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
