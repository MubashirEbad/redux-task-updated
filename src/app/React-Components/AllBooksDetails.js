import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Stylesheets/SuggestionStyle.css';
import '../Stylesheets/AllBooksDetailsStyle.css';

function AllBooksDetails(props) {
    const step = 5;
    const { data: booksData } = props;
    const { index: startingIndex } = props;

    return (
        <div className="suggestion-box">
            <h3> You searched: "{props.searchedText}" </h3>
            {
                booksData.slice(startingIndex, startingIndex + step).map((item, index) =>
                    <div className="suggestions-books-grid" key={index}>
                        <img src={item.image} className="books-image"  alt = "Missing"/>
                        <p>
                            {item.title}
                            <br />
                            <strong>by: {item.author}</strong>
                        </p>
                    </div>
                )
            }
            <div className="buttonsGrid">
                {
                    startingIndex > 0 &&
                    <div className="prev-button-div">
                        <button onClick={props.prevButtonClicked}> Previous </button>
                    </div>
                }
                {
                    (booksData.length - startingIndex) > 5 &&
                    <div className="next-button-div">
                        <button onClick={props.nextButtonClicked}> Next </button>
                    </div>
                }
            </div>
            <Link to='/Home'><h4> Back to Main Menu </h4></Link>
        </div>
    )
}
function mapStateToProps(store){
    return{
        data: store.insertDataReducer,
    }
}
export default connect(mapStateToProps)(AllBooksDetails);