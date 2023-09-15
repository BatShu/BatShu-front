import {
  ReadAccidentByIdResponse,
  ReadAccidentsByLocationResponse,
} from "@/data/hooks/accident";
import { API_ACCIDENT_PATH } from "@/domain/apiPaths";
import { rest } from "msw";

export const handlers = [
  rest.get(API_ACCIDENT_PATH, (_, res, ctx) => {
    return res(
      ctx.json({
        ok: true,
        data: [
          {
            id: 0,
            location: {
              x: 127.02877138902706,
              y: 37.553756043633705,
              level: 1,
            },
          },
          {
            id: 1,
            location: {
              x: 127.11223931056016,
              y: 37.59973258972703,
              level: 2,
            },
          },
          {
            id: 2,
            location: {
              x: 127.03877138902706,
              y: 37.5737560436337,
              level: 1,
            },
          },
        ],
      } satisfies ReadAccidentsByLocationResponse)
    );
  }),
  rest.get(`${API_ACCIDENT_PATH}/:accidentId`, (req, res, ctx) => {
    return res(
      ctx.json({
        ok: true,
        data: {
          id: Number(req.params.accidentId),
          author: {
            uid: "0",
            email: "[이메일]",
            displayName: "0번 유",
            photoURL: "[프로필 사진 url]",
          },
          contentTitle: "게시글 제목",
          contentDescription: "게시글 내용",
          photos: [
            "https://images.unsplash.com/photo-1682686581362-796145f0e123",
            "https://images.unsplash.com/photo-1694481348806-0b6de4934812",
          ],
          accidentTime: "사고 시간",
          accidentlocation: {
            x: 127.02877138902706,
            y: 37.553756043633705,
            level: 1,
          },
          createdTime: "Thu Sep 14 2023 18:00:41 GMT+0900 (한국 표준시)",
        },
      } satisfies ReadAccidentByIdResponse)
    );
  }),
];
