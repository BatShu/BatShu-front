import axios from "axios";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { enqueueSnackbar } from "notistack";

const acceptableImageExt = ["jpg", "jpeg", "png"];
const acceptableVideoExt = ["mp4", "wmv", "mov", "avi", "dat"];

export type TFile = {
  file: Blob | null;
  url: string;
  [key: string]: any;
};

const checkAcceptableExt = (fileName: string, acceptableArr: string[]) => {
  const fileExtIdx = fileName.lastIndexOf(".");
  const fileExt = fileName.slice(fileExtIdx + 1).toLowerCase();

  return acceptableArr.some((acceptable) => fileExt === acceptable);
};

const setSingleFile = (
  event: ChangeEvent<HTMLInputElement>,
  setFileState: Dispatch<SetStateAction<TFile | null>>,
  type: "image" | "video" = "image"
) => {
  event.preventDefault();
  const { target } = event;

  if (!target.files) return;

  const acceptableArray =
    type === "image" ? acceptableImageExt : acceptableVideoExt;

  const file = target.files[0];
  const url = URL.createObjectURL(file);

  if (checkAcceptableExt(file.name, acceptableArray)) {
    setFileState({ file, url });
  } else {
    enqueueSnackbar(`${acceptableArray.join(", ")}파일만 가능합니다!`);
  }
};

const setMultipleFile = (
  event: ChangeEvent<HTMLInputElement>,
  setFileState: Dispatch<SetStateAction<TFile[]>>,
  type: "image" | "video" = "image"
) => {
  event.preventDefault();
  const { target } = event;

  if (!target.files) return;

  const acceptableArray =
    type === "image" ? acceptableImageExt : acceptableVideoExt;

  for (let i = 0; i < target.files.length; i += 1) {
    const file = target.files[i];

    if (checkAcceptableExt(file.name, acceptableArray)) {
      const url = URL.createObjectURL(file);
      setFileState((prev) => [...prev, { file, url }]);
    } else {
      enqueueSnackbar(`${acceptableArray.join(", ")}파일만 가능합니다!`);
    }
  }
};

// execute URL.revokeObjectURL to prevent memory leak
const deleteSingleFile = (
  setFileState: Dispatch<SetStateAction<TFile | null>>
) => {
  setFileState((file) => {
    if (file) URL.revokeObjectURL(file.url);
    return null;
  });
};

const deleteMultipleFileByIndex = (
  index: number,
  setFileState: Dispatch<SetStateAction<TFile[]>>
) => {
  setFileState((prev) =>
    prev.filter(({ url }, idx) => {
      if (idx !== index) return true;
      else {
        URL.revokeObjectURL(url);
        return false;
      }
    })
  );
};

const urlToFile = async (image: TFile): Promise<Blob> => {
  const { file, url } = image;
  if (file) return file;

  const { data } = await axios(url, { responseType: "blob" });

  const fileName = url.split("/").pop()?.split(".")[0];
  const ext = url.split(".").pop()?.split("?")[0];

  const convertedFile = new File([data], `${fileName}.${ext}`, {
    type: `image/${ext}`,
  });

  return convertedFile;
};

export {
  setSingleFile,
  setMultipleFile,
  deleteSingleFile,
  deleteMultipleFileByIndex,
  urlToFile,
};
