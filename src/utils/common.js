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

export const convertMetaDataGoogle = (bookData) => {
  let highResImage = bookData.volumeInfo.imageLinks
  highResImage.thumbnail = highResImage.thumbnail.replace('zoom=1', 'zoom=0')

  return {
    id: bookData.id,
    title: bookData.volumeInfo.title,
    authors: bookData.volumeInfo.authors,
    publisher: bookData.volumeInfo.publisher,
    publishedDate: bookData.volumeInfo.publishedDate,
    isbn: bookData.volumeInfo.industryIdentifiers,
    description: bookData.volumeInfo.description,
    pageCount: bookData.volumeInfo.pageCount,
    categories: bookData.volumeInfo.categories,
    imageLinks: highResImage,
  }
}

export const convertMetaDataNYT = (bookData) => {
  return {
    id: bookData.primary_isbn13,
    title: bookData.title,
    authors: [bookData.author],
    publisher: bookData.publisher,
    publishedDate: null,
    isbn: [
      { type: 'ISBN_13', identifier: bookData.primary_isbn13 },
      { type: 'ISBN_10', identifier: bookData.primary_isbn10 },
    ],
    description: bookData.description,
    pageCount: null,
    categories: null,
    imageLinks: {
      thumbnail: bookData.book_image,
    },
  }
}
