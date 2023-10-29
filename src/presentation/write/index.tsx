import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FormProvider } from "react-hook-form";
// styles
import { Box, css } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { sliderSettings } from "@/presentation/configs";
// store
import {
  useWriteForm,
  writeFormState,
} from "@/presentation/write/hooks/writeForm";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
// types
import { PostAccidentDto, PostObserveDto } from "@/domain/dtos/accidentObserve";
import { TFile } from "@/lib";
// lib
import { useMutation } from "@tanstack/react-query";
import { accidentObserverRepository } from "@/data/backend";
import { levelToRadius } from "@/data/util/map";
// components
import SelectType from "./components/SelectType";
import DotsHeader from "./components/DotsHeader";
import Detail from "./templates/Detail";

export const WritePage = () => {
  const [curPage, setCurPage] = useState(0);

  const details = useWriteForm();
  const handleSubmit = details.handleSubmit;
  const sliderRef = useRef<Slider>(null);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (data: writeFormState) => {
      const isAccident = data.type === "사고자";

      const { postAccident, postObserve } = accidentObserverRepository;

      const formData = Object.entries(data).reduce((acc, [k, v]) => {
        if (k === "location") {
          v = { x: v.lat, y: v.lng, radius: levelToRadius(v.level) };
          k = isAccident ? "accidentLocation" : "observeLocation";
        } else if (k === "accidentTime") {
          k = isAccident ? "accidentTime" : "observeTime";
        } else if (k === "photos") {
          v = v.map(({ file }: TFile) => file);
        }

        acc[k as keyof (PostAccidentDto | PostObserveDto)] = v;

        return acc;
      }, {} as PostAccidentDto & PostObserveDto);

      await (isAccident ? postAccident : postObserve)(formData);
    },
  });
  const onSubmit = async (data: writeFormState) => {
    mutate(data);
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
