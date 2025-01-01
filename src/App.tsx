import './App.css'
import LoremIpsumGenerator from './components/lorem'

function App() {

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 ">
    <div className=" w-full h-full container mx-auto flex justify-center items-center">
      <LoremIpsumGenerator />
    </div>
  </div>
  )
}

export default App
