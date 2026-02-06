// Generate consistent mock data for a given day
export function generateMockDataForDay(dayOffset) {
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  
  // Base pattern that varies slightly by day
  const dayVariation = (dayOffset % 7) * 0.1 // Slight variation based on day of week
  
  // Generate spot prices (0-200 öre/kWh)
  // Pattern: low at night, peak during midday
  const spotPrices = hours.map((hour, i) => {
    const h = parseInt(hour)
    if (h < 6) return 0 + dayVariation * 10
    if (h < 10) return 20 + h * 10 + dayVariation * 5
    if (h < 14) return 60 + (h - 10) * 30 + dayVariation * 10
    if (h < 18) return 180 - (h - 14) * 5 + dayVariation * 5
    if (h < 22) return 160 - (h - 18) * 20 + dayVariation * 5
    return 80 - (h - 22) * 10 + dayVariation * 5
  })

  // Generate battery activity (kWh) - charging at low prices, discharging at high
  const batteryActivity = hours.map((hour, i) => {
    const price = spotPrices[i]
    if (price < 30) {
      // Charging during low prices
      return Math.random() * 2 + 0.5 // 0.5 to 2.5 kWh
    } else if (price > 150) {
      // Discharging during high prices
      return -(Math.random() * 3 + 1) // -1 to -4 kWh
    }
    return 0
  })

  // Generate SOC (%) - starts at 50%, changes based on battery activity
  let currentSOC = 50
  const soc = hours.map((hour, i) => {
    const activity = batteryActivity[i]
    // SOC changes by approximately activity / 10 (assuming 100kWh battery capacity)
    currentSOC += activity * 10
    currentSOC = Math.max(0, Math.min(100, currentSOC))
    return Math.round(currentSOC)
  })

  // Generate revenue (kr) - only when discharging at high prices
  const revenue = hours.map((hour, i) => {
    const activity = batteryActivity[i]
    const price = spotPrices[i]
    if (activity < 0 && price > 100) {
      // Revenue = discharged energy * price difference
      return Math.abs(activity) * (price / 100) * 0.1 // Simplified calculation
    }
    return 0
  })

  return hours.map((time, i) => ({
    time,
    spotPrice: Math.max(0, Math.min(200, Math.round(spotPrices[i]))),
    soc: soc[i],
    batteryActivity: Math.round(batteryActivity[i] * 10) / 10,
    revenue: Math.round(revenue[i] * 10) / 10,
  }))
}
