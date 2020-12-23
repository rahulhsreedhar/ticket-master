import React, { useState } from "react";
import './Search.css'
import axios from 'axios';
const url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=Mz0aGrBC9hKfSbcdrJZjPA3CHkxe2ABU';
const Search = (props) => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [histPosition, setHistPosition] = useState(0);
    const [disableButton, setDisableButton] = useState(true);



    const setHistory = () => {
        if (searchHistory.length < 5) {
            setHistPosition(0);
            setSearchHistory([...searchHistory, searchKeyword]);
        }
        else {
            let histPositionOld = histPosition;
            if (histPosition === 5) {
                setHistPosition(0)
                histPositionOld = 0;
            }
            const histArray = [...searchHistory];
            histArray[histPositionOld] = searchKeyword
            setSearchHistory([...histArray]);
            setHistPosition(histPositionOld + 1);
        }
    }
    const searchData = () => {
        props.setSearchResult('Loading....')

        setDisableButton(true)
        setHistory();
        axios.get(
            `${url}&keyword=${searchKeyword}`)
            .then(function (response) {
                props.setError('')

                setDisableButton(false)

                let names = [];
                if (response.data._embedded) {
                    response.data._embedded.events.forEach(val => {
                        names.push(val.name)
                    });
                    props.setSearchResult(names)

                }
                else {
                    props.setSearchResult('No Data')
                }
            })
            .catch(function (error) {
                setDisableButton(false)
                props.setSearchResult([])

                props.setError('Something went wrong')
            })

    };
    const inputChange = (evt => {
        setSearchKeyword(evt.target.value)

        if (evt.target.value !== '') {
            setDisableButton(false)
        }
        else {
            setDisableButton(true)

        }
    });

    return (
        <div>
            <label htmlFor="searchKey">Enter search key </label>
            <input type="text" id="searchKey" value={searchKeyword} onChange={e => inputChange(e)} />
            <button onClick={searchData} disabled={disableButton}>Search</button>

            <div className="history">
                <span>Search History</span>
                <hr />
                {searchHistory.map((val, index) => {
                    return <div key={val + index}>{val}</div>
                })}
            </div>
        </div>
    )
}

export default Search;