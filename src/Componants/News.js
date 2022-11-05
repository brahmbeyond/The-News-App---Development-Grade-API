import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 10,
    catrgory: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
constructor(props) {
    super(props);
    this.state = {
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
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
  //       this.setState({articles : parsedData.articles});

  //   }
  // apiUrl =;
  news = async () => {
    this.props.setProgress(10);
    this.setState({ loading: true });
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=694937b9f554425e9c51144cc8e184f5&page=${this.state.page}&pageSize=${this.props.pageSize}`);
    this.props.setProgress(40);
  
  
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalresults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }



  async componentDidMount() {
    this.news();
    this.setState({page: this.state.page + 1})
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=694937b9f554425e9c51144cc8e184f5&page=${this.state.page}&pageSize=${this.props.pageSize}`);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalresults: parsedData.totalResults,
    });
  };


  // prevNews = async () => {
  //   this.news();
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  // }
  // nextNews = async () => {
  //   this.news();
  //   this.setState({
  //     page: this.state.page + 1,
  //   });

  // }


  render() {
    return (
      // <div className='conatiner my-5 mx-4'>
      //   <div className='row row-cols-1 row-cols-md-3 g-4'>
      //     {this.state.articles.map((element) => {
      //      return <NewsItem key={element._id} title={element.title} desc={element.summary} 
      //      link={element.link} media={element.media} 
      //      date={element.published_date}
      //      />
      //     })}

      //   </div>
      // </div>
      <>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='conatiner my-5 mx-4'>
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {this.state.articles.map((element) => {
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
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.prevNews}>prev</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)} className="btn btn-dark" onClick={this.nextNews}>next</button>
        </div> */}
     </>
    )
  }
}
