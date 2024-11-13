import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Loading from "../components/Loading"
import { useSnackbar } from "notistack"

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishingYear, setPublishingYear] = useState('')
  const [loading, setLoading] = useState('')
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3000/api/v1/books/${id}`)
    .then((response) => {
      setAuthor(response.data.author)
      setPublishingYear(response.data.publishingYear)
      setTitle(response.data.title)
      setLoading(false)
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please check console.')
      console.log(error);
      
    })
  }, [id])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishingYear
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/api/v1/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' })
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
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Loading /> : ''} 
      {/* check the loading state and if its true show a loading state else return empty string */}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-4xl mr-4 text-gray-500">Title</label>
          <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-4xl mr-4 text-gray-500">Author</label>
          <input 
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
        <label className="text-4xl mr-4 text-gray-500">Publishing Year</label>
          <input 
          type="text"
          value={publishingYear}
          onChange={(e) => setPublishingYear(e.target.value)}
          className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook