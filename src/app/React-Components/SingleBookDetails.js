import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function SingleBookDetails(props){
    const bookname = props.book;
    const {data: booksData} = props;
    const newArray = booksData.filter((item) => {
        if(item.title[0] === bookname){
            return item;
        }
    });
    console.log(bookname);
    return(
        <div>
            <h4> You searched: { bookname} </h4>
            {
                newArray.map((item, index) =>
                    <div className="suggestions-books-grid" key={index}>
                        <img src={item.image}  alt = "Missing"/>
                        <p>
                            {item.title}
                            <br />
                            <strong>by: {item.author}</strong>
                        </p>
                    </div>
                )
            }
            <Link to="/Home"> Back To Main Menu! </Link>
        </div>
    )
}
function mapStateToProps(store){
    return{
        data: store.insertDataReducer,
    }
}
export default connect(mapStateToProps)(SingleBookDetails);