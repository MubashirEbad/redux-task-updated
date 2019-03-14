
import { parseString } from 'xml2js';
import * as types from './actionTypes';
import { GOODREADS_API_LINK } from '../React-Components/ExternalUrls';

export function loadBooksDataSuccess(booksRecords) {
    return {
        type: types.LOAD_BOOKS_DATA_SUCCESS,
        booksRecords
    }
}

export function fetchDataFromAPI(text = '') {
    console.log('first');
    return async function (dispatch) {
        return await makeAPICalls(text)
            .then((dataInJSON) => {
                dispatch(loadBooksDataSuccess(dataInJSON))
            })
    }
}

async function makeAPICalls(text) {
    const dataInXMLForm = await fetchData(text);
    return parseData(dataInXMLForm);
}

async function fetchData(text) {
    return await fetch(`${GOODREADS_API_LINK}${text}`)
        .then((Response) => {
            return Response.text();
        })
}

export function parseData(data) {
    let jsonInString;

    parseString(data, function (error, result) {
        if (!error) {
            jsonInString = JSON.stringify(result);
        }
    });

    let tempArray = [];
    const getJson = [JSON.parse(jsonInString)];
    const path = getJson[0].GoodreadsResponse.search[0].results[0].work;


    if (path) {
        path.map((item) => {
            const title = item.best_book[0].title;
            const author = item.best_book[0].author[0].name;
            const image = item.best_book[0].small_image_url;
            tempArray.push({ title, author, image });
        });
    }
    else {
        console.log('Some Error has occurred');
    }
    return tempArray;
}