export const getFormatedAmount = (amount) => 
  new Intl.NumberFormat('en-US', { style: "currency", currency: "USD" }).format(amount)