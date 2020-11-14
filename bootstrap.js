const { writeFile } = require('fs').promises
const Ceramic = require('@ceramicnetwork/ceramic-http-client').default
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools')
const Wallet = require('identity-wallet').default
const fromString = require('uint8arrays/from-string')
const { genKeyPairFromSeed } = require('skynet-js')

const UserSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Profile',
  type: 'object',
  properties: {
    fullname: {
      type: 'string',
      title: 'fullname',
    },
    avatar: {
      type: 'string',
      title: 'avatar',
    },
    bio: {
      type: 'string',
      title: 'bio',
    },
    publicKey: {
      type: 'string',
      title: 'publicKey',
    },
  },
}

async function run() {
  // Connect to the local Ceramic node
  const ceramic = new Ceramic('https://ceramic.3boxlabs.com')
  // const ceramic = new Ceramic('https://ceramic.evius.id')

  const mnemonic = process.env.MNEMONIC
  const { privateKey } = genKeyPairFromSeed(mnemonic)

  const seed = fromString(privateKey, 'base16')

  try {
    console.log('creating wallet')
    // Create a wallet and set it as the DID provider to author documents
    const wallet = await Wallet.create({
      ceramic,
      // The seed must be provided as an environment variable
      seed: seed,
      getPermission() {
        // This will grant all permission requests
        return Promise.resolve([])
      },
      // IDX is not needed for this wallet
      disableIDX: true,
    })
    console.log('setting DID provider')
    await ceramic.setDIDProvider(wallet.getDidProvider())

    console.log('publish schemas')
    const userSchemaID = await publishSchema(ceramic, { content: UserSchema })

    console.log('create definitions')
    // Create the definition using the created schema ID
    const userDefinitionID = await createDefinition(ceramic, {
      name: 'profile',
      description: 'User Profile',
      schema: userSchemaID.toUrl('base36'),
    })

    // Write config to JSON file
    const config = {
      definitions: {
        user: userDefinitionID.toString(),
      },
      schemas: {
        user: userSchemaID.toUrl('base36'),
      },
    }
    await writeFile('./src/config.json', JSON.stringify(config))

    console.log('Config written to src/config.json file:', config)
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

run().catch(console.error)
