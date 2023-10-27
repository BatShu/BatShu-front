import {
  GET_ACCIDENT_BY_LOCATION,
  POST_ACCIDENT,
  POST_OBSERVE,
  POST_VIDEO_UPLOAD,
} from "@/domain/endpoint";
import { AppResponse } from "@/domain/models/appResponse";
import { authApi } from "../util/fetcher";
import {
  PostAccidentDto,
  PostObserveDto,
  ReadAccidentsByLocationData,
  ReadAccidentsByLocationDto,
  UpdateVideoData,
} from "@/domain/dtos/accidentObserve";
import { TFile } from "@/lib";
import { Accident } from "@/domain/models/accident";
import { Observe } from "@/domain/models/observe";
import { appendToFormData } from "../util/common";

export class AccidentObserverRepository {
  async readAccidentsByLocation(
    dto: ReadAccidentsByLocationDto
  ): Promise<ReadAccidentsByLocationData> {
    const res = await authApi.get<AppResponse<ReadAccidentsByLocationData>>(
      GET_ACCIDENT_BY_LOCATION(dto)
    );
    return res.data.data;
  }

  async uploadVideo(videoFile: TFile): Promise<number> {
    const formData = new FormData();
    formData.append("video", videoFile.file);
    const res = await authApi.post<AppResponse<UpdateVideoData>>(
      POST_VIDEO_UPLOAD,
      formData
    );
    return res.data.data.videoId[0].id;
  }

  async postAccident(dto: PostAccidentDto): Promise<void> {
    const formData = new FormData();
    appendToFormData(formData, dto);
    await authApi.post<AppResponse<Accident>>(POST_ACCIDENT, formData);
  }

  async postObserve(dto: PostObserveDto): Promise<void> {
    const formData = new FormData();
    appendToFormData(formData, dto);
    await authApi.post<AppResponse<Observe>>(POST_OBSERVE, formData);
  }
}
