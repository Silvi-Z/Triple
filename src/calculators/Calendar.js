import * as Yup from "yup"

class Calendar {

  static form = {
    start: null,
    end: null,
  }

  // TODO : define validation rules
  static schema = Yup.object().shape({
    schedule: Yup.number().oneOf([5, 6]).required(),
    dates: Yup.array().min(1),
    date_from: Yup.date().required(),
    date_to: Yup.date().required(),
  })

}

export default Calendar
