import dayjs from "dayjs";
// store
import { ILocation } from "@/domain/models/location";
// lib
import { TFile } from "@/lib";
import {
  UseFormProps,
  UseFormReturn,
  useForm,
  useFormContext,
} from "react-hook-form";

type TWriter = "사고자" | "목격자" | null;

export interface writeFormState {
  type: TWriter;
  contentTitle: string;
  licensePlate: string;
  time: [string, string];
  videoId: number | null;
  photos: TFile[];
  location: ILocation | null;
  placeName: string;
  carModelName: string;
  bounty: number;
  contentDescription: string;
}

const initialState: writeFormState = {
  type: null,
  contentTitle: "",
  licensePlate: "",
  time: [dayjs().format(), dayjs().format()],
  videoId: null,
  photos: [],
  location: null,
  placeName: "",
  carModelName: "",
  bounty: 0,
  contentDescription: "",
};
export const useWriteForm = (
  props?: UseFormProps<writeFormState>
): UseFormReturn<writeFormState> => {
  return useForm<writeFormState>({
    ...props,
    defaultValues: initialState,
  });
};

export const useWriteFormContext = () => {
  return useFormContext<writeFormState>();
};
