import type { WeatherData } from "@/schema"
import { getWeatherData } from "@/services/axios"
import { createContext, useContext, useEffect, useState } from "react"
import type { Dispatch, SetStateAction, ReactNode } from "react"

export interface Coords {
  lng: number
  lat: number
}

interface WeatherContextProps {
  coords: Coords
  setCoords: Dispatch<SetStateAction<Coords>>
  weatherData: WeatherData | null
}

interface WeatherContextProviderProps {
  children: ReactNode
}

export const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
)

const WeatherContextProvider = ({ children }: WeatherContextProviderProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [coords, setCoords] = useState<Coords>({
    lng: 2.3522,
    lat: 48.8566,
  })

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData(coords.lng, coords.lat)
        setWeatherData(data)
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
        }
      }
    }

    fetchWeatherData()
  }, [coords])

  return (
    <WeatherContext.Provider
      value={{
        coords,
        setCoords,
        weatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeatherContext = () => {
  const context = useContext(WeatherContext)

  if (context === undefined) {
    throw new Error(
      "useWeatherContext must be used within a WeatherContextProvider"
    )
  }

  return context
}

export default WeatherContextProvider
