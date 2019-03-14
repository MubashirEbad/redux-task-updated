import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import LoadingIcon from './LoadingIcon';
import '../Stylesheets/Main_Page_Style.css';
import SuggestionsBox from './SuggestionsBox';
import AllBooksDetails from './AllBooksDetails';
import SingleBookDetails from './SingleBookDetails';
import * as types from '../Redux - Action Creators/actionTypes';
import { fetchDataFromAPI } from '../Redux - Action Creators/action-fetchDataFromAPI';
import { updateLoadingIconStatus } from '../Redux - Action Creators/action-loadingIcon';
import { bindActionCreators } from 'redux';


class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            operationType: 'default',
            index: 0,
            bookName: ''
        }

        let inputBoxText = '';

        this.onChange = this.onChange.bind(this);
        this.MoreBooksEvent = this.MoreBooksEvent.bind(this);
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
        this.singleBookEvent = this.singleBookEvent.bind(this);
        this.updateStateForButtonsClicked = this.updateStateForButtonsClicked.bind(this);
        this.nextButtonClicked = this.nextButtonClicked.bind(this);
        this.prevButtonClicked = this.prevButtonClicked.bind(this);
    }
    onChange = debounce(async (text = '') => {
        if (text !== '') {
            this.props.updateLoadingIconStatus(true, types.LOADING_ICON_STATUS);
            await this.props.fetchDataFromAPI(text, types.LOAD_BOOKS_DATA_SUCCESS);
            this.inputBoxText = text;
            if (this.props.booksRecords.length > 0) {
                this.setState({
                    operationType: 'showSuggestions'
                })
            }
            else {
                this.setState({
                    operationType: 'showNotFoundMessage'
                })
            }
        }
        else {
            this.inputBoxText = text;
            this.setState({
                operationType: 'default'
            })
        }

    }, 300);

    onSearchButtonClick() {
        this.inputBoxText === '' ?
            alert('Please enter something in the search box')
            :
            this.MoreBooksEvent()
    }

    MoreBooksEvent() {
        this.setState({
            operationType: 'moreBooks'
        })
    }

    singleBookEvent(event) {
        let bookname = event.target.innerHTML;
        const indexof = bookname.indexOf('<');
        const book = bookname.substr(0, indexof)
        this.setState({
            operationType: 'singleBook',
            bookName: book
        })
    }

    updateStateForButtonsClicked(tempIndex) {
        this.setState({
            index: tempIndex
        })
    }
    nextButtonClicked() {
        const index = this.state.index + 5;
        this.updateStateForButtonsClicked(index);
    }

    prevButtonClicked() {
        const index = this.state.index - 5;
        this.updateStateForButtonsClicked(index);
    }

    render() {

        console.log(this.props);

        let operation = this.state.operationType;
        // const { booksRecords: booksdata } = this.props;
        const { loadingIconStatus: iconStatus } = this.props;
        // console.log(iconStatus);

        const getRenderingComponent = {
            default:
                <div>
                    {this.pageComponents()}
                </div>,

            showLoading:
                <div>
                    {this.pageComponents()}
                    <LoadingIcon />
                </div>,

            singleBook:
                // <SingleBookDetails book={this.state.bookName} data={booksdata} />,
                <SingleBookDetails book={this.state.bookName} />,

            moreBooks:
                // <AllBooksDetails searchedText={this.inputBoxText} data={booksdata} index={this.state.index} prevButtonClicked={this.prevButtonClicked} nextButtonClicked={this.nextButtonClicked} />,
                <AllBooksDetails searchedText={this.inputBoxText} index={this.state.index} prevButtonClicked={this.prevButtonClicked} nextButtonClicked={this.nextButtonClicked} />,

            showSuggestions:
                <div>
                    {this.pageComponents()}
                    {/* <SuggestionsBox data={booksdata} MoreBooksEvent={this.MoreBooksEvent} singleBookEvent={this.singleBookEvent} index={this.state.index} /> */}
                    <SuggestionsBox MoreBooksEvent={this.MoreBooksEvent} singleBookEvent={this.singleBookEvent} index={this.state.index} />
                </div>,

            showNotFoundMessage:
                <div>
                    {this.pageComponents()}
                    <h4> No result found for: "{this.inputBoxText}"</h4 >
                </div>,

        }

        return (
            <div className="MainContainer" >
                {iconStatus ? getRenderingComponent['showLoading'] : getRenderingComponent[operation]}
            </div>
        )

    }
    pageComponents() {
        return (
            <div className="MainContainerContent">
                <h1> Should I read a book? </h1>
                <input type="text" placeholder="Search here..." className="MainContainerSearchBox" onChange={e => this.onChange(e.target.value)} />
                <button onClick={this.onSearchButtonClick}> Search </button>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
        booksRecords: store.insertDataReducer,
        loadingIconStatus: store.updateLoadingIconStatus
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateLoadingIconStatus,
        fetchDataFromAPI
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);