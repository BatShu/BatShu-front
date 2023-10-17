/*
 * unknown error를 Error로 변환해 message를 이용 가능하게 합니다.
 */
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  } else {
    return new Error("Unknown error");
  }
};
