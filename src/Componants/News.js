import React, { Component } from 'react'
import NewsItem from './NewsItem'


export default class News extends Component {



  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true
    }
  };

  async componentDidMount(){
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6a9a50d7afmsh4dd6f42d1fed78cp184326jsn64d0ef714c15',
        'X-RapidAPI-Host': 'newscatcher.p.rapidapi.com'
      }
    };
  
let data = await  fetch('https://newscatcher.p.rapidapi.com/v1/latest_headlines?lang=en&media=True', options);
      
      let parsedData = await data.json();
      // console.log(parsedData);
      this.setState({articles : parsedData.articles});

  }

 

  render() {
    return (
      <div className='conatiner my-5 mx-4'>
        <div className='row row-cols-1 row-cols-md-3 g-4'>
          {this.state.articles.map((element) => {
           return <NewsItem key={element._id} title={element.title} desc={element.summary} 
           link={element.link} media={element.media} 
           date={element.published_date}
           />
          })}

        </div>
      </div>
    )
  }
}
