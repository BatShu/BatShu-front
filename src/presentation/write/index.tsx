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
// types
import {
  TPostAccidentResponse,
  TPostObserveResponse,
} from "@/domain/models/appResponse";
// lib
import { appendToFormData } from "@/data/util/common";
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

    const isAccident = type === "사고자";
    const endPoint = isAccident ? POST_ACCIDENT : POST_OBSERVE;

    const formData = new FormData();

    appendToFormData(formData, {
      contentTitle: title,
      contentDescription: content.description,
      placeName: content.placeName,
      carModelName: content.carModelName,
      licensePlate: licensePlate,
      [isAccident ? "accidentTime" : "observeTime"]: accidentTime,
      [isAccident ? "accidentLocation" : "observeLocation"]: JSON.stringify({
        // FIXME: optional chaining
        x: content.location?.lng,
        y: content.location?.lat,
      }),
    });

    if (isAccident) {
      appendToFormData(formData, {
        bounty: String(content.bounty),
        photos: content.photos.map(({ file }) => file as Blob),
      });
    } else {
      appendToFormData(formData, { videoId: String(content.videoId) });
    }

    // FIXME: 런타임 내에서 결정되는 타입이라 자동완성이 안됨
    const res = await API.POST<
      typeof isAccident extends true
        ? TPostAccidentResponse
        : TPostObserveResponse
    >(endPoint, { body: formData });

    console.log(res);
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
