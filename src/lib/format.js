const rub = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 })

export const formatNumber = (value) => rub.format(Math.round(value))
export const formatRub = (value) => `${formatNumber(value)}\u00A0₽`
