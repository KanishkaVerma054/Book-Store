import  { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import { TbBooks } from "react-icons/tb";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
    .get("http://localhost:3000/api/v1/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4 h-screen'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-start items-center ml-4'>
        <TbBooks className=' text-5xl'/>
        <h1 className='text-3xl my-8'>Library</h1>
        </div>
        
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;