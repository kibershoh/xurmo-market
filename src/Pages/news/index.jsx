import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import noimage from '../../assets/notimage.jpg'
import CardLoader from '../../Constants/LoaderCard';
const News = () => {
  const url = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=40ff1f7d7bb34dccbc9d2bd3cae48f1a';


  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {

        const response = await axios.get(url);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  console.log(articles);
  return (
    <div className='mt-20'>
      {
        (loading && window.navigator.onLine) ? <CardLoader />
          :
          <div className='grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 w-full gap-3'>
            {

              articles.map((item, index) => (
                <div key={index} className='p-4 shadow rounded relative pb-16'>
                 <div className='w-full relative'>
                   <div class="w-full relative mx-auto  overflow-hidden rounded-lg">
                    <img src={item.urlToImage ? item.urlToImage : noimage} alt="" className="w-full h-60 max-lg:h-44   relative z-0 rounded-lg transition-all duration-300 hover:scale-110"/>
                  </div>
                 </div>
                  <span className='text-slate-500'>{item.source.name}</span>
                  <p className='pt-3'>{item.title}

                  </p>
                  <div className='text-right 
                  absolute bottom-4 right-4
                  '>
                    <Link target='_blank' to={item.url} className='bg-blue-600 text-white rounded p-2 hover:bg-blue-800'>Read More</Link>
                  </div>
                </div>
              ))


            }

          </div>
      }
    </div>
  )
}

export default News