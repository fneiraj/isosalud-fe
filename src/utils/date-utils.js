import { differenceInYears, parse } from 'date-fns'

const calculateAge = (dob, format) => {
  const date = parse(dob, format, new Date())
  return differenceInYears(new Date(), date)
}

export default {
  calculateAge
}
