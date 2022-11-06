import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  //   async componentDidMount(){
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': '6a9a50d7afmsh4dd6f42d1fed78cp184326jsn64d0ef714c15',
  //         'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
  //       }
  //     };

  // let data = await  fetch('https://newscatcher.p.rapidapi.com/v1/latest_headlines?lang=en&media=True', options);

  //       let parsedData = await data.json();
  //       // console.log(parsedData);
  //         setState({articles : parsedData.articles});

  //   }
  // apiUrl =;
  const news = async () => {
    props.setProgress(10);
    setLoading(true)
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`);
    props.setProgress(40);


    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    news();
    setPage(page + 1)
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1)
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)

  };


  // prevNews = async () => {
  //     news();
  //     setState({
  //     page:     page - 1,
  //   });
  // }
  // nextNews = async () => {
  //     news();
  //     setState({
  //     page:     page + 1,
  //   });

  // }

  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;


  return (
    // <div className='conatiner my-5 mx-4'>
    //   <div className='row row-cols-1 row-cols-md-3 g-4'>
    //     {    articles.map((element) => {
    //      return <NewsItem key={element._id} title={element.title} desc={element.summary} 
    //      link={element.link} media={element.media} 
    //      date={element.published_date}
    //      />
    //     })}

    //   </div>
    // </div>
    <>
      <div className="text-center text-info my-3">
        <h2>News from {capitalizeFirstLetter(props.category)} category </h2>
      </div>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='conatiner my-5 mx-4'>
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {articles.map((element) => {
              return (
                <NewsItem id={element.url}
                  title={element.title}
                  desc={element.description}
                  link={element.url} media={element.urlToImage}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              )
            })}
          </div> </div >
      </InfiniteScroll >




      {/* <div className='d-flex justify-content-between'>
          <button type="button" disabled={    page <= 1} className="btn btn-dark" onClick={  prevNews}>prev</button>
          <button type="button" disabled={    page + 1 > Math.ceil(    totalresults /   props.pageSize)} className="btn btn-dark" onClick={  nextNews}>next</button>
        </div> */}
    </>
  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 10,
  catrgory: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}



export default News

