import { Button } from "./components/ui/button"
function App() {

  return (
      <div>
          <Button>Click me</Button>
          <p className="text-2xl font-light">The quick brown fox ...</p>
          <p className="text-2xl font-normal">The quick brown fox ...</p>
          <p className="text-2xl font-medium">The quick brown fox ...</p>
          <p className="text-2xl font-semibold">The quick brown fox ...</p>
          <p className="text-2xl font-bold">The quick brown fox ...</p>
      </div>
  )
}

export default App
