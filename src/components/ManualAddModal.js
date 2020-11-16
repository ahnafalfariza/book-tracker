import React from 'react'
import { useForm } from 'react-hook-form'

import Modal from './Modal'

const ManualAddModal = ({ onClose, onPressAdd, isLoading }) => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    data.authors = [data.authors]
    data.id = Date.now()
    console.log(data)
    onPressAdd('readingList', data, false)
  }

  return (
    <Modal close={onClose}>
      <div className="max-w-xl w-full px-4 py-2 bg-gray-100 m-auto rounded-md">
        <h1>Manual Add</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-sm">Book Cover</label>
            <input type="file" id="imageLinks" name="imageLinks" accept="image/png, image/jpeg" ref={register} />
            <label className="block text-sm">Title</label>
            <input type="text" name="title" placeholder="Title book" ref={register({ required: true })} />
            <label className="block text-sm">Author</label>
            <input type="text" name="authors" placeholder="Author" ref={register({ required: true })} />
            <label className="block text-sm">Publisher</label>
            <input type="text" name="publisher" placeholder="Publisher" ref={register} />
            <label className="block text-sm">Published Date</label>
            <input type="text" name="publishedDate" placeholder="Published Date" ref={register} />
            <label className="block text-sm">Description</label>
            <input type="text" name="description" placeholder="Description" ref={register} />
            <label className="block text-sm">Page Count</label>
            <input type="number" name="pageCount" placeholder="Page Count" ref={register} />
            <label className="block text-sm">Categories</label>
            <input type="text" name="categories" placeholder="Categories" ref={register} />
            <label className="block text-sm">ISBN</label>
            <input type="number" name="isbn" placeholder="ISBN" ref={register} />
            <button type="submit">{isLoading ? 'Loading' : 'Add Book'}</button>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default ManualAddModal
