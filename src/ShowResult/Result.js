import React from "react";
import './Result.css'
const Result = (props) => {
     return (
        <div className="result">
            <h3>Search Result</h3>
            <hr />
            {Array.isArray(props.searchResult) ? props.searchResult.map((val, index) => {
                return <div key={val + index}>{val}</div>
            }) : props.searchResult}

        </div>
    )
}

export default Result;