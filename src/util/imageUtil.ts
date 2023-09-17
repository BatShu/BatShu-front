import { ChangeEvent, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const acceptableExt = ["jpg", "jpeg", "png"];

export interface TFile {
  file: Blob | null;
  url: string;
  [key: string]: any;
}

const checkAcceptableExt = (fileName: string) => {
  const fileExtIdx = fileName.lastIndexOf(".");
  const fileExt = fileName.slice(fileExtIdx + 1).toLowerCase();

  return acceptableExt.some((acceptable) => fileExt === acceptable);
};

const setMultipleFile = (
  event: ChangeEvent<HTMLInputElement>,
  setFileState: Dispatch<SetStateAction<TFile[]>>
) => {
  event.preventDefault();
  const { target } = event;

  if (!target.files) return;

  for (let i = 0; i < target.files.length; i += 1) {
    const reader = new FileReader();
    const file = target.files[i];

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (checkAcceptableExt(file.name)) {
        setFileState((prev) => [...prev, { file, url: String(reader.result) }]);

        target.value = "";
      } else {
        enqueueSnackbar("jpg, jpeg, png 파일만 가능합니다!");
      }
    };
  }
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

export { setMultipleFile, urlToFile };
