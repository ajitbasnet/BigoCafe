export interface SeasonalItem {
  id: string
  seasonName: string
  startDate: string // ISO date
  endDate: string
  name: string
  description: string
  image: string
  price: number
  specialBadge: string
  limitedAvailability: number | null // null = unlimited
  preparationTime: number
  rewardPointsEarned: number
}

export const seasonalItems: SeasonalItem[] = [
  {
    id: "sea-1",
    seasonName: "Winter Special",
    startDate: "2025-12-01",
    endDate: "2026-02-28",
    name: "Spiced Hot Chocolate",
    description: "Rich hot chocolate with cinnamon, nutmeg, and marshmallows",
    image: "/images/bigo-coffee.jpg",
    price: 320,
    specialBadge: "Winter Exclusive",
    limitedAvailability: 50,
    preparationTime: 5,
    rewardPointsEarned: 4,
  },
  {
    id: "sea-2",
    seasonName: "Winter Special",
    startDate: "2025-12-01",
    endDate: "2026-02-28",
    name: "Gingerbread Latte",
    description: "Espresso with gingerbread syrup and whipped cream",
    image: "/images/bigo-coffee.jpg",
    price: 350,
    specialBadge: "Limited Time",
    limitedAvailability: null,
    preparationTime: 6,
    rewardPointsEarned: 4,
  },
  {
    id: "sea-3",
    seasonName: "Winter Special",
    startDate: "2025-12-01",
    endDate: "2026-02-28",
    name: "Cranberry Scone",
    description: "Fresh scone with dried cranberries and orange zest",
    image: "/images/bigo-pastry.jpg",
    price: 280,
    specialBadge: "Seasonal",
    limitedAvailability: 30,
    preparationTime: 5,
    rewardPointsEarned: 3,
  },
  {
    id: "sea-4",
    seasonName: "Spring Preview",
    startDate: "2026-02-01",
    endDate: "2026-04-30",
    name: "Strawberry Shortcake",
    description: "Light sponge with fresh strawberries and cream",
    image: "/images/dish-4.jpg",
    price: 450,
    specialBadge: "Coming Soon",
    limitedAvailability: 20,
    preparationTime: 10,
    rewardPointsEarned: 5,
  },
]

export function getActiveSeasonalItems() {
  const now = new Date()
  return seasonalItems.filter((item) => {
    const start = new Date(item.startDate)
    const end = new Date(item.endDate)
    return now >= start && now <= end
  })
}

export function getSeasonalItemsBySeason(seasonName: string) {
  return seasonalItems.filter((item) => item.seasonName === seasonName)
}

export function getActiveSeasons() {
  const now = new Date()
  const seasons = new Set<string>()
  seasonalItems.forEach((item) => {
    const start = new Date(item.startDate)
    const end = new Date(item.endDate)
    if (now >= start && now <= end) {
      seasons.add(item.seasonName)
    }
  })
  return Array.from(seasons)
}
