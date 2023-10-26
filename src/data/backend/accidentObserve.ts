import { GET_ACCIDENT_BY_LOCATION, POST_VIDEO_UPLOAD } from "@/domain/endpoint";
import { AppResponse } from "@/domain/models/appResponse";
import { authApi } from "../util/fetcher";
import {
  ReadAccidentsByLocationData,
  ReadAccidentsByLocationDto,
  UpdateVideoData,
} from "@/domain/dtos/accidentObserve";
import { TFile } from "@/lib";

export class AccidentObserverRepository {
  async readAccidentsByLocation(
    dto: ReadAccidentsByLocationDto
  ): Promise<ReadAccidentsByLocationData> {
    const res = await authApi.get<AppResponse<ReadAccidentsByLocationData>>(
      GET_ACCIDENT_BY_LOCATION(dto)
    );
    return res.data.data;
  }

  async updateVideo(videoFile: TFile): Promise<number> {
    const formData = new FormData();
    formData.append("video", videoFile.file);
    const res = await authApi.post<AppResponse<UpdateVideoData>>(
      POST_VIDEO_UPLOAD,
      formData
    );
    return res.data.data.videoId[0].id;
  }
}
