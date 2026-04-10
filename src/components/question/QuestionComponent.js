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

  // TODO: Implement any event handlers required by your question set
  const handleSearch = () =>{
    if(!keyword.trim()) return;
    setSearchParams({search:keyword});
    get(`/api/tasks?search=${keyword}`)
    .then(data =>{
      console.log(data);
      const result = Array.isArray(data) ? data : data.tasks || [];
      setTasks(result);
    })
    .catch(err => console.error(err));
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
        placeholder="Search tasks..."/>

      <button onClick={handleSearch}>Search</button>
      {/* TODO: Render fetched data or form elements as required */}
      <div>
        {Array.isArray(tasks) && tasks.map(task => (
          <div key = {task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status:{task.status}</p>
          </div>
        ))}
        </div>
    </div>
  );
}

export default QuestionComponent;
