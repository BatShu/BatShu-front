import { GET_ACCIDENT_BY_LOCATION } from "@/domain/endpoint";
import { AppResponse } from "@/domain/models/appResponse";
import { authApi } from "../util/fetcher";
import { ReadAccidentsByLocationDto } from "@/domain/dtos/accidentObserve";
import { AccidentPreview } from "@/domain/models/accident";

export type ReadAccidentsByLocationData = AccidentPreview[];
export class AccidentObserverRepository {
  private levelToRadius = (level: number) => {
    switch (level) {
      case 1:
        return 10;
      case 2:
        return 20;
      case 3:
        return 30;
      case 4:
        return 50;
      case 5:
        return 100;
      case 6:
        return 200;
      case 7:
        return 500;
      default:
        return 500;
    }
  };
  async readAccidentsByLocation(dto: ReadAccidentsByLocationDto) {
    const res = await authApi.get<AppResponse<ReadAccidentsByLocationData>>(
      GET_ACCIDENT_BY_LOCATION({
        x: dto.x,
        y: dto.y,
        radius: this.levelToRadius(dto.level),
      })
    );
    return res.data.data;
  }
}
