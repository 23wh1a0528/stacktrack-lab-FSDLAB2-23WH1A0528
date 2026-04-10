import React, {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {get} from '../../api/client';
// TODO: Import any API functions you need from '../../api/client'
// Example: import { get, post } from '../../api/client';

function QuestionComponent() {
  // TODO: Define state variables needed for your question set
  const [tasks, setTasks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // TODO: Implement data fetching inside a useEffect hook
  useEffect(() =>{
    setKeyword(searchQuery);
  }, [searchQuery]);

  useEffect(() =>{
    if(searchQuery){
      get(`/api/tasks?search=${searchQuery}`)
      .then(data =>{
        console.log(data);

        const result = Array.isArray(data) ? data : data.tasks || [];
        setTasks(result);
      })
      .catch(err => console.error(err));
    }
  }, [searchQuery]);

  // TODO: Implement any event handlers required by your question set
  const handleSearch = () =>{
    setSearchParams({search:keyword});
  };

  return (
    <div>
      {/* TODO: Replace this placeholder with your question set UI */}
      <h2>Search Tasks</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        placeholder="Enter Keyword"/>

      <button onClick={handleSearch}>Search</button>
      {/* TODO: Render fetched data or form elements as required */}
      <div>
        {Array.isArray(tasks) && tasks.map(tasks => (
          <div key = {tasks._id}>
            <h3>{tasks.title}</h3>
            <p>{tasks.description}</p>
            <p>Status:{tasks.status}</p>
          </div>
        ))}
        </div>
    </div>
  );
}

export default QuestionComponent;
