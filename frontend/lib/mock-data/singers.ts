export interface Singer {
  id: string
  name: string
  genre: string
  image: string
  bio: string
}

export interface DailySinger {
  singer: Singer
  timeStart: string
  timeEnd: string
}

export const dailySinger: DailySinger = {
  singer: {
    id: "s1",
    name: "Anita Maharjan",
    genre: "Acoustic & Folk",
    image: "/images/placeholder.jpg",
    bio: "Local artist blending Nepali folk with contemporary acoustic.",
  },
  timeStart: "18:00",
  timeEnd: "21:00",
}

export const bookableSingers: Singer[] = [
  { id: "s1", name: "Anita Maharjan", genre: "Acoustic & Folk", image: "/images/placeholder.jpg", bio: "Local artist blending Nepali folk with contemporary acoustic." },
  { id: "s2", name: "Raj Shrestha", genre: "Jazz & Blues", image: "/images/placeholder.jpg", bio: "Jazz vocalist and guitarist." },
  { id: "s3", name: "Sita K.C.", genre: "Classical & Bollywood", image: "/images/placeholder.jpg", bio: "Trained classical singer, Bollywood covers." },
]

export interface SingerAvailabilitySlot {
  date: string
  timeSlots: string[]
}

export function getMockSingerAvailability(singerId: string): SingerAvailabilitySlot[] {
  const dates: SingerAvailabilitySlot[] = []
  for (let i = 1; i <= 14; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const dateStr = d.toISOString().slice(0, 10)
    dates.push({
      date: dateStr,
      timeSlots: ["10:00", "14:00", "18:00"].filter(() => Math.random() > 0.3),
    })
  }
  return dates
}
