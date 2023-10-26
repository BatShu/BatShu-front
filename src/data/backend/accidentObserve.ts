import { GET_ACCIDENT_BY_LOCATION } from "@/domain/endpoint";
import { AppResponse } from "@/domain/models/appResponse";
import { authApi } from "../util/fetcher";
import { ReadAccidentsByLocationDto } from "@/domain/dtos/accidentObserve";
import { AccidentPreview } from "@/domain/models/accident";

export type ReadAccidentsByLocationData = AccidentPreview[];
export class AccidentObserverRepository {
  async readAccidentsByLocation(dto: ReadAccidentsByLocationDto) {
    const res = await authApi.get<AppResponse<ReadAccidentsByLocationData>>(
      GET_ACCIDENT_BY_LOCATION(dto)
    );
    return res.data.data;
  }
}
