import React from 'react'
import Modal from './Modal'

const ChooseLibraryModal = ({
  header = 'Add Book',
  bookTitle = 'Nama Buku',
  authors = [],
  onPress,
  onClose,
  isLoading,
}) => {
  return (
    <Modal close={onClose}>
      <div className="max-w-xl w-full px-4 py-2 bg-gray-100 m-auto rounded-md">
        <h1>{header}</h1>
        <h1>{bookTitle}</h1>
        <h2>by {authors.join(', ')}</h2>
        <form>
          <div className="flex flex-col">
            <label>Choose your library</label>
            <div>
              <button disabled={isLoading} onClick={() => onPress('readingList')}>
                Reading List
              </button>
            </div>
            <div>
              <button disabled={isLoading} onClick={() => onPress('readingNow')}>
                Reading Now
              </button>
            </div>
            <div>
              <button disabled={isLoading} onClick={() => onPress('finished')}>
                Finished
              </button>
            </div>
            <button disabled={isLoading} onClick={onClose}>
              {isLoading ? 'Loading' : 'Cancel'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ChooseLibraryModal
