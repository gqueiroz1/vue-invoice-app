export function humanizeDate (date) {
  const formattedDate = new Date(date).toDateString().split(' ')
  formattedDate.shift()
  return formattedDate.join(' ')
}

export function formatCurrency (value, language = 'en-US', style = 'currency', currency = 'USD') {
  const currencyFormatter = new Intl.NumberFormat(language, { style, currency })
  return currencyFormatter.format(value)
}

export function addDaysToDate (currentDate, numberOfDays) {
  const newDate = new Date(currentDate).getTime() + (numberOfDays * 24 * 60 * 60 * 1000)

  return humanizeDate(newDate)
}