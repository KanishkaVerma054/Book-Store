import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Loading from "../components/Loading"
import { useSnackbar } from "notistack"

const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const handleDeleteBook = () => {
    setLoading(true)
    axios
      .delete(`http://localhost:3000/api/v1/books/${id}`)
      .then(() => {
        setLoading(false)
        enqueueSnackbar('Book Deleted successfully', { variant: 'error' })
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(error);
      })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Loading /> : ''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you Sure You want to delete this book?</h3>

        <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default DeleteBook