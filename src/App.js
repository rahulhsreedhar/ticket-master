import { useState } from "react";
import './App.css';
import Search from './Search/Search'
import Result from './ShowResult/Result'
function App() {
  const [searchResult, setSearchResult] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="App">
      <h2>Search Discovery</h2>
      <Search setSearchResult={setSearchResult} setError={setError}></Search>
      <Result searchResult={searchResult}></Result>
      <div className="error">{error}</div>
    </div>
  );
}

export default App;
