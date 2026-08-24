// importing components
import MyMap from "./components/custom/MyMap"
import AdditionalInfo from "./components/custom/AdditionalInfo"

const App = () => {
  return (
    <main className="flex h-screen w-full items-center gap-4 p-4">
      {/* <h2 className="flex items-center gap-2 font-semibold">
        <Cloud fill="white" />
        Weather App
      </h2> */}
      <AdditionalInfo />
      <MyMap />
    </main>
  )
}

export default App
