import { genKeyPairAndSeed } from 'skynet-js'
import './styles/tailwind.css'

function App() {
	const x = genKeyPairAndSeed()
	console.log(x)

	return (
		<div className="flex items-center justify-center">
			<div className="text-red-900 text-3xl">HELLO WORLD</div>
		</div>
	)
}

export default App
