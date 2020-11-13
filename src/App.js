import { genKeyPairFromSeed } from 'skynet-js'
import { generateMnemonic } from 'bip39'
import './styles/tailwind.css'

function App() {
	// generate new mnemonic with length 256
	// const mnemonic = generateMnemonic(256)
	// console.log(mnemonic)

	const mnemonic = `wait eternal sphere excuse lift ozone brother curtain imitate chalk pear sound impulse badge kind vibrant arena regret broken ghost error amazing wild welcome`

	const y = genKeyPairFromSeed(mnemonic)
	console.log(y)

	return (
		<div className="flex items-center justify-center">
			<div className="text-red-900 text-3xl">HELLO WORLD</div>
		</div>
	)
}

export default App
