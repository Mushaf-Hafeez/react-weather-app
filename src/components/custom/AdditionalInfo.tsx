import { useWeatherContext } from "@/context/WeatherContext"
import { Card, CardContent, CardHeader } from "../ui/card"
import Logo from "./Logo"
import { AdditionalInfoCard } from "./AdditionalInfoCard"

const AdditionalInfo = () => {
  const { weatherData } = useWeatherContext()

  if (!weatherData) {
    return (
      <Card className="h-full w-full flex-1 p-4">
        <CardHeader className="flex items-center gap-2 p-0">
          <Logo />
        </CardHeader>

        <CardContent>
          <p className="text-zinc-400">Loading weather...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full w-full flex-1 scrollbar-none overflow-y-auto p-4">
      <CardHeader className="flex items-center gap-2 p-0">
        <Logo />
      </CardHeader>

      <CardContent className="space-y-4 p-0">
        <Card className="shadow-lg">
          <CardContent>
            <p className="text-zinc-400">Current weather</p>
            <div className="mt-2 flex items-center justify-between font-outfit text-2xl font-semibold">
              <h2>{weatherData?.name}</h2>
              <h1 className="text-4xl">{`${Math.round(weatherData.main.temp)}°C`}</h1>
            </div>
            <p className="text-zinc-400">{`Feels like ${Math.round(weatherData.main.feels_like)}°C`}</p>
          </CardContent>
        </Card>

        <AdditionalInfoCard data={weatherData} />
      </CardContent>
    </Card>
  )
}

export default AdditionalInfo
