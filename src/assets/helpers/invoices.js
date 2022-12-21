import { formatCurrency } from "./format";

export const states = {
  draft: { label: 'Draft', value: 'draft', color: 'gray' },
  pending: { label: 'Pending', value: 'pending', color: 'warning' },
  paid: { label: 'Paid', value: 'paid', color: 'positive' }
}

export function getItemTotal ({ price, quantity }) {
  return formatCurrency(price * quantity)
}

export function getInvoiceTotalValue (itemsList) {
  const total = itemsList?.reduce((prevValue, currentValue) => {
    return prevValue += currentValue.price * currentValue.quantity
  }, 0)

  return formatCurrency(total)
}