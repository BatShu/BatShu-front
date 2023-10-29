export const levelToRadius = (level: number): number => {
  return (
    (() => {
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
          return 250;
        case 7:
          return 500;
        default:
          return 500;
      }
    })() * 16
  );
};
