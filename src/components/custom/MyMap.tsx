import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
  type MapRef,
} from "@/components/ui/map"
import { Card } from "@/components/ui/card"
import { Button } from "../ui/button"
import { LoaderCircle, Locate, MapPin } from "lucide-react"
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import MyError from "./MyError"
import { useWeatherContext, type Coords } from "@/context/WeatherContext"
import type { MapMouseEvent } from "maplibre-gl"

const MapEventListener = ({
  setCoords,
}: {
  setCoords: Dispatch<SetStateAction<Coords>>
}) => {
  const { coords } = useWeatherContext()
  const { map } = useMap()

  useEffect(() => {
    if (!map) return

    const handleClick = (e: MapMouseEvent) => {
      const { lng, lat } = e.lngLat

      setCoords({
        lng,
        lat,
      })

      map.flyTo({
        center: [lng, lat],
        essential: true,
      })
    }

    map.on("click", handleClick)
    return () => {
      map.off("click", handleClick)
    }
  }, [map, coords])

  return null
}

const MyMap = () => {
  const { coords, setCoords } = useWeatherContext()
  const mapRef = useRef<MapRef>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState<boolean>(false)

  const getUserLocation = () => {
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords

        setCoords({
          lng: longitude,
          lat: latitude,
        })

        mapRef.current?.flyTo({
          center: [longitude, latitude],
          essential: true,
        })

        setIsLocating(false)
      },
      (err) => {
        setError(err.message)
        setIsLocating(false)
      }
    )
  }

  if (error) {
    return <MyError errorMessage={error} />
  }

  return (
    <Card className="relative h-1/2 w-full overflow-hidden p-0 lg:h-full lg:w-3/4">
      <Map ref={mapRef} center={[coords.lng, coords.lat]} zoom={2}>
        <MapMarker longitude={coords.lng} latitude={coords.lat}>
          <MarkerContent>
            <div className="cursor-pointer">
              <MapPin size={20} className="animate-bounce" />
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Coordinates</p>
              <p className="text-xs text-muted-foreground tabular-nums">
                {coords.lng}, {coords.lat}
              </p>
            </div>
          </MarkerPopup>
        </MapMarker>
        <MapControls />
        <MapEventListener setCoords={setCoords} />
      </Map>
      <Button
        size={"icon"}
        variant={"secondary"}
        className="absolute bottom-2 left-2"
        onClick={getUserLocation}
        disabled={isLocating}
      >
        {isLocating ? <LoaderCircle className="animate-spin" /> : <Locate />}
      </Button>
    </Card>
  )
}

export default MyMap
