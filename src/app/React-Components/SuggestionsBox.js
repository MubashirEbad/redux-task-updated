import React from 'react';
import { connect } from 'react-redux';
import '../Stylesheets/SuggestionStyle.css';

function SuggestionsBox(props) {
    const startingIndex = 0;
    const step = 5;
    const { data: booksData } = props;
    return (
        <div className="suggestion-box">
            {
                booksData.slice(startingIndex, step).map((item,index) =>
                    <div className="suggestions-books-grid" key={index}>
                        <img src={item.image} className="books-image" alt = "Missing"/>
                        <p onClick={props.singleBookEvent}>{item.title}<br />
                            <strong>by: {item.author}</strong>
                        </p>
                    </div>
                )
            }
            {
                booksData.length > 5 &&
                <h4 className="moreBooksLink" onClick={props.MoreBooksEvent}> Get {booksData.length} more records</h4>
            }
        </div>
    )
}
function mapStateToProps(store){
    return{
        data: store.insertDataReducer,
    }
}
export default connect(mapStateToProps)(SuggestionsBox);