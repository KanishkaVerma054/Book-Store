import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "../components/BackButton"
import Loading from "../components/Loading"
import { useSnackbar } from "notistack"

const CreateBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishingYear, setPublishingYear] = useState('')
  const [loading, setLoading] = useState('')
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar()
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishingYear
    };
    setLoading(true);
    axios
      .post('http://localhost:3000/api/v1/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully', { variant: 'success' })
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        alert('A error happened. Please Check console')
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(error);
        
      })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBook