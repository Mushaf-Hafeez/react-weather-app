import type { WeatherData } from "@/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdditionalInfoCardProps {
  data: WeatherData
}

export const AdditionalInfoCard: React.FC<AdditionalInfoCardProps> = ({
  data,
}) => {
  // Convert visibility from meters to kilometers
  const visibilityKm = data?.visibility
    ? (data.visibility / 1000).toFixed(1)
    : "0.0"

  // Convert Unix timestamps to readable local times
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "--:--"
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Additional Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Wind Widget */}
          <div className="space-y-1">
            <span className="block text-xs font-medium text-muted-foreground">
              Wind
            </span>
            <strong className="block text-base font-bold">
              {data?.wind?.speed ?? 0} m/s
            </strong>
            <span className="block text-xs text-muted-foreground/80">
              Direction: {data?.wind?.deg ?? 0}°
            </span>
          </div>

          {/* Pressure Widget */}
          <div className="space-y-1">
            <span className="block text-xs font-medium text-muted-foreground">
              Pressure
            </span>
            <strong className="block text-base font-bold">
              {data?.main?.pressure ?? 0} hPa
            </strong>
          </div>

          {/* Visibility Widget */}
          <div className="space-y-1">
            <span className="block text-xs font-medium text-muted-foreground">
              Visibility
            </span>
            <strong className="block text-base font-bold">
              {visibilityKm} km
            </strong>
          </div>

          {/* Sunrise & Sunset Widget */}
          <div className="space-y-1">
            <span className="block text-xs font-medium text-muted-foreground">
              Sun Schedule
            </span>
            <div className="mt-0.5 flex items-center gap-1 text-sm font-semibold">
              <span>🌅</span> {formatTime(data?.sys?.sunrise)}
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <span>🌇</span> {formatTime(data?.sys?.sunset)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
