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
// components
import SelectType from "./components/SelectType";
import DotsHeader from "./components/DotsHeader";
import Detail from "./templates/Detail";
import { useMutation } from "@tanstack/react-query";
import { accidentObserverRepository } from "@/data/backend";
import { enqueueSnackbar } from "notistack";

const useWriteMutation = () => {
  return useMutation({
    mutationFn: async (data: writeFormState) => {
      const isAccident = data.type === "사고자";
      if (isAccident) {
        await accidentObserverRepository.postAccident({
          accidentLocation: {
            x: data.location?.lng ?? 0,
            y: data.location?.lat ?? 0,
          },
          accidentTime: data.time,
          contentTitle: data.contentTitle,
          contentDescription: data.contentDescription,
          licensePlate: data.licensePlate,
          placeName: data.placeName,
          carModelName: data.carModelName,
          bounty: data.bounty,
          photos: data.photos,
        });
      } else {
        await accidentObserverRepository.postObserve({
          ...data,
          observeLocation: {
            x: data.location?.lng ?? 0,
            y: data.location?.lat ?? 0,
          },
          observeTime: data.time,
        });
      }
    },
  });
};
export const WritePage = () => {
  const [curPage, setCurPage] = useState(0);

  const details = useWriteForm();
  const handleSubmit = details.handleSubmit;
  const sliderRef = useRef<Slider>(null);
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useWriteMutation();
  const onSubmit = async (data: writeFormState) => {
    mutateAsync(data)
      .then(() => {
        enqueueSnackbar("신고가 완료되었습니다.", { variant: "success" });
        navigate(-1);
      })
      .catch(() => {
        enqueueSnackbar("신고에 실패했습니다.", { variant: "error" });
      });
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
                  <Detail isLoading={isLoading} />
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
