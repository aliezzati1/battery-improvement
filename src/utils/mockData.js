// Generate consistent mock data for a given day
export function generateMockDataForDay(dayOffset) {
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
  
  // More variation between days - use dayOffset to create different patterns
  const daySeed = dayOffset * 7 // Create more variation
  const priceMultiplier = 0.8 + (dayOffset % 5) * 0.1 // 0.8 to 1.2
  const activityMultiplier = 0.7 + (dayOffset % 4) * 0.2 // 0.7 to 1.3
  
  // Generate spot prices - varies by day
  // Pattern: low at night, peak during midday
  // Minimum price is 10 öre/kWh (never zero)
  const spotPrices = hours.map((hour, i) => {
    const h = parseInt(hour)
    let basePrice = 10 // Start from minimum of 10 instead of 0
    if (h < 6) basePrice = 10 + Math.random() * 10 // 10-20 during night
    else if (h < 10) basePrice = 20 + h * 10
    else if (h < 14) basePrice = 60 + (h - 10) * 30
    else if (h < 18) basePrice = 180 - (h - 14) * 5
    else if (h < 22) basePrice = 160 - (h - 18) * 20
    else basePrice = 80 - (h - 22) * 10
    
    // Add day variation
    const variation = Math.sin((daySeed + i) * 0.1) * 20
    return Math.max(10, basePrice * priceMultiplier + variation) // Ensure minimum is 10
  })

  // Generate battery activity (kWh) - charging at low prices, discharging at high
  // Varies more between days
  // CRITICAL: Charging and discharging must never occur in the same hour
  // Each hour must be either charging (positive), discharging (negative), or idle (zero)
  const batteryActivity = hours.map((hour, i) => {
    const price = spotPrices[i]
    if (price < 30) {
      // Charging during low prices - varies by day
      // Ensure minimum charge value is > 0 to avoid rounding to zero
      const baseCharge = 0.5 + Math.random() * 2 // 0.5 to 2.5 kWh
      const chargeValue = baseCharge * activityMultiplier
      // Round to 1 decimal place, ensure it's always positive
      return Math.max(0.1, Math.round(chargeValue * 10) / 10)
    } else if (price > 150) {
      // Discharging during high prices - varies by day
      // Ensure minimum discharge value is < 0 to avoid rounding to zero
      const baseDischarge = -(1 + Math.random() * 3) // -1 to -4 kWh
      const dischargeValue = baseDischarge * activityMultiplier
      // Round to 1 decimal place, ensure it's always negative
      return Math.min(-0.1, Math.round(dischargeValue * 10) / 10)
    }
    // No activity - explicitly return 0
    return 0
  })

  // Generate SOC (%) - starts at 50%, changes based on battery activity
  let currentSOC = 50
  const soc = hours.map((hour, i) => {
    const activity = batteryActivity[i]
    // SOC changes by approximately activity * 10 (assuming 100kWh battery capacity)
    currentSOC += activity * 10
    currentSOC = Math.max(0, Math.min(100, currentSOC))
    return Math.round(currentSOC)
  })

  // Generate revenue (kr) - only when discharging at high prices
  // Varies based on activity and price
  const revenue = hours.map((hour, i) => {
    const activity = batteryActivity[i]
    const price = spotPrices[i]
    if (activity < 0 && price > 100) {
      // Revenue = discharged energy * price * efficiency factor
      const efficiency = 0.08 + (dayOffset % 3) * 0.02 // 0.08 to 0.12
      return Math.abs(activity) * (price / 100) * efficiency
    }
    return 0
  })

  return hours.map((time, i) => ({
    time,
    spotPrice: Math.round(spotPrices[i]),
    soc: soc[i],
    batteryActivity: Math.round(batteryActivity[i] * 10) / 10,
    revenue: Math.round(revenue[i] * 10) / 10,
  }))
}
