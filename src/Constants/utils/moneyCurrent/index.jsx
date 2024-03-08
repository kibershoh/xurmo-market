const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "UZS",
   style: "currency",
     minimumFractionDigits: 0

})
export function formatCurrency(number) {
  return CURRENCY_FORMATTER.format(number)
}
