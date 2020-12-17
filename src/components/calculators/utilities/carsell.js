import * as Yup from "yup"

export const ENGINE_HORSEPOWER = 1
export const ENGINE_KILOWATTS = 2

export const CAR_SELL_MIN = 0;
export const CAR_SELL_MAX = 300000000;
export const CAR_SELL_STEP = 100000;

export const schema = Yup.object().shape({
  achievementDate: Yup.date().required(),
  alienationDate: Yup.date().required(),
  price: Yup.number().required(),
  power: Yup.number().required(),
  powerType: Yup.number().oneOf([ENGINE_HORSEPOWER, ENGINE_KILOWATTS]).required(),
});
