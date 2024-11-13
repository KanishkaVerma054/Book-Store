import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Loading from "../components/Loading"

const ShowBook = () => {
  const [book, setBook] = useState({})
  const [loading, setloading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setloading(true);
    axios
      .get(`http://localhost:3000/api/v1/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setloading(false)
      })
      .catch((error) => {
        console.log(error);
        setloading(false)
      })
  }, [id])

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-3 text-gray-500 ">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishingYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook