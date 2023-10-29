import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { enqueueSnackbar } from "notistack";

const acceptableImageExt = ["jpg", "jpeg", "png"];
const acceptableVideoExt = ["mp4", "wmv", "mov", "avi", "dat"];

const checkAcceptableExt = (fileName: string, acceptableArr: string[]) => {
  const fileExtIdx = fileName.lastIndexOf(".");
  const fileExt = fileName.slice(fileExtIdx + 1).toLowerCase();

  return acceptableArr.some((acceptable) => fileExt === acceptable);
};

const setSingleFile = (
  event: ChangeEvent<HTMLInputElement>,
  setFileState: Dispatch<SetStateAction<Blob | null>>,
  type: "image" | "video" = "image"
) => {
  event.preventDefault();
  const { target } = event;

  if (!target.files) return;

  const acceptableArray =
    type === "image" ? acceptableImageExt : acceptableVideoExt;

  const file = target.files[0];

  if (checkAcceptableExt(file.name, acceptableArray)) {
    setFileState(file);
  } else {
    enqueueSnackbar(`${acceptableArray.join(", ")}파일만 가능합니다!`);
  }
};

const setMultipleFile = (
  event: ChangeEvent<HTMLInputElement>,
  onChange: (...event: any[]) => void,
  type: "image" | "video" = "image"
) => {
  event.preventDefault();
  const { target } = event;
  const files = target.files;
  if (files == null) {
    onChange([]);
    return;
  }

  const acceptableArray =
    type === "image" ? acceptableImageExt : acceptableVideoExt;

  const newFiles = [...files].map((file) => {
    if (checkAcceptableExt(file.name, acceptableArray)) {
      return file;
    } else {
      enqueueSnackbar(`${acceptableArray.join(", ")}파일만 가능합니다!`);
    }
  });
  onChange(newFiles);
};

// execute URL.revokeObjectURL to prevent memory leak
const deleteSingleFile = (
  setFileState: Dispatch<SetStateAction<Blob | null>>
) => {
  setFileState(() => {
    return null;
  });
};

const deleteMultipleFileByIndex = (
  index: number,
  setFileState: Dispatch<SetStateAction<Blob[]>>
) => {
  setFileState((prev) =>
    prev.filter((_, idx) => {
      if (idx !== index) return true;
      return false;
    })
  );
};

export {
  setSingleFile,
  setMultipleFile,
  deleteSingleFile,
  deleteMultipleFileByIndex,
};
