import {
  GET_ACCIDENT_BY_LOCATION,
  GET_OBSERVE_BY_LOCATION,
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
  ReadByLocationDto,
  ReadObservesByLocationData,
  UpdateVideoData,
} from "@/domain/dtos/accidentObserve";
import { Accident } from "@/domain/models/accident";
import { Observe } from "@/domain/models/observe";
import { appendToFormData } from "../util/common";

export class AccidentObserverRepository {
  async readAccidentsByLocation(
    dto: ReadByLocationDto
  ): Promise<ReadAccidentsByLocationData> {
    const res = await authApi.get<AppResponse<ReadAccidentsByLocationData>>(
      GET_ACCIDENT_BY_LOCATION(dto)
    );
    return res.data.data;
  }

  async readObservesByLocation(
    dto: ReadByLocationDto
  ): Promise<ReadObservesByLocationData> {
    const res = await authApi.get<AppResponse<ReadObservesByLocationData>>(
      GET_OBSERVE_BY_LOCATION(dto)
    );
    return res.data.data;
  }

  async uploadVideo(videoFile: Blob): Promise<number> {
    const formData = new FormData();
    formData.append("video", videoFile);
    const res = await authApi.post<AppResponse<UpdateVideoData>>(
      POST_VIDEO_UPLOAD,
      formData
    );
    return res.data.data.id;
  }

  async postAccident(dto: PostAccidentDto): Promise<void> {
    const formData = new FormData();
    appendToFormData(formData, dto);
    await authApi.post<AppResponse<Accident>>(POST_ACCIDENT, dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async postObserve(dto: PostObserveDto): Promise<void> {
    await authApi.post<AppResponse<Observe>>(POST_OBSERVE, dto);
  }

  async readObserveById(observeId: number): Promise<Observe> {
    const res = await authApi.get<AppResponse<Observe>>(
      `api/observe/${observeId}`
    );
    return res.data.data;
  }
  async readAccidentById(accidentId: number): Promise<Accident> {
    const res = await authApi.get<AppResponse<Accident>>(
      `api/accident/${accidentId}`
    );
    return res.data.data;
  }
}
