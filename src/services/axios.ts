import axios from "axios"
import { WeatherSchema, type WeatherData } from "@/schema"

const API = import.meta.env.VITE_API_KEY

export const getWeatherData = async (
  lon: number,
  lat: number
): Promise<WeatherData> => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API}`
  )

  return WeatherSchema.parse(data)
}
