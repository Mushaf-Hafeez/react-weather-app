import { z } from "zod"

export const WeatherSchema = z.object({
  base: z.string(),
  // Fixes the OpenWeather string/number mixed type bug for 'cod'
  cod: z.coerce.number(),
  dt: z.number(),
  id: z.number(),
  name: z.string(),
  timezone: z.number(),
  visibility: z.number(),

  coord: z.object({
    lat: z.number(),
    lon: z.number(),
  }),

  clouds: z.object({
    all: z.number(),
  }),

  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    sea_level: z.coerce.number().optional(),
    grnd_level: z.coerce.number().optional(),
  }),

  wind: z.object({
    speed: z.number(),
    deg: z.number(),
    gust: z.number().optional(),
  }),

  sys: z.object({
    country: z.string(),
    sunrise: z.number(),
    sunset: z.number(),
  }),

  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
})

export type WeatherData = z.infer<typeof WeatherSchema>
