// importing components
import MyMap from "./components/custom/MyMap"
import AdditionalInfo from "./components/custom/AdditionalInfo"

const App = () => {
  return (
    <main className="flex h-screen w-full flex-col-reverse items-center gap-4 p-4 lg:flex-row">
      <AdditionalInfo />
      <MyMap />
    </main>
  )
}

export default App
