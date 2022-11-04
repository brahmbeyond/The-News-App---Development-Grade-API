import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { id, title, desc, link, media, date, source } = this.props;
    const imgUrl = "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg";
    return (
      <>
        <div className="col " key={id}>
         
          <div className="card h-100">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
            <img src={media ? media : imgUrl} className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title"> {title}</h5>
              {/* <p className="card-text">{desc?desc.slice(0,100):"Click on Read more for news"}</p> */}
              <p className="card-text">{desc}</p>
            </div>

            <a className="btn btn-sm btn-warning" href={link} target='_blank' role="button">Read More</a>

            <div className="card-footer">
              <small className="text-danger">Published on : {date}</small>
            </div>
          </div>
        </div>
      </>
    )
  }
}
