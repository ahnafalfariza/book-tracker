export const readFileAsUrl = (file) => {
  const temporaryFileReader = new FileReader()

  return new Promise((resolve, reject) => {
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result)
    }
    temporaryFileReader.readAsDataURL(file)
  })
}

export const parseImgUrl = (url) => {
  if (!url) {
    return ''
  }
  const [protocol, path] = url.split('://')
  if (protocol === 'ipfs') {
    return `https://ipfs-gateway.paras.id/ipfs/${path}`
  }
  if (protocol === 'sia') {
    return `https://siasky.net/${path}`
  }
  return url
}
