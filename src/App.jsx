import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];


/* Refactoring for Wave 4*/
const kbaseURL = 'http://localhost:5000';

// Completed
const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.completed_at
  };

  delete newTask.completed_at;
  return newTask;
};


const getAllTasksApi = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then( response => {
      const apiTasks = response.data;
      const newTasks= apiTasks.map(convertFromApi);
      return newTasks;
    })
    .catch(error => {
      console.log(error);
    });
};

// API Call to check for task complete OR incomplete
const checkCompletionTaskApi = (id, completeCheck) => {
  const completeEndpoint = completeCheck? 'mark_complete': 'mark_incomplete';

  return axios.patch(`${kbaseURL}/tasks/${id}/${completeEndpoint}`)
    .then( response => {
      const newTask = convertFromApi(response.data);
      return newTask;
    })
    .catch( error => {
      console.log(error);
    });
};


// Deleting API call/request based on task id provided
const removeTaskApi = (id) => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch(error => {
      console.log(error);
    });
};


const App = () => {
  const [tasks, setTasksData] = useState(TASKS);

  const getAllTasks = () => {
    getAllTasksApi()
      .then(tasks => {
        setTasksData(tasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);


  const toggleIsTaskComplete = (id) => {
    console.log(`we selected this task: ${id}`);
    // Check this currnet task (id):
    // check its prop for isCompleted
    // true/false -> ternary statement maybe?
    // return (task)

    const currentTask = tasks.find(task => task.id === id);

    checkCompletionTaskApi(id, !currentTask.isComplete)
      .then((apiTask) => {
        setTasksData(tasks => tasks.map(task => {
          if(task.id === id) {
            return apiTask;
          } else {
            return task;
          }
        }));
      });
  };

  const deleteTaskHandle = (id) => {
    removeTaskApi(id)
      .then(() => {
        setTasksData(tasks => tasks.filter(task => {return task.id != id;}));
      });
  };

  // From Wave 3:
  // const toggleIsTaskComplete = (id) => {
  //   setTasksData(tasks => tasks.map(task=>{
  //     if(task.id === id) {
  //       return {...task, isComplete: !task.isComplete};
  //     }
  //     else {
  //       return task;
  //     }
  //   }));
  // };

  // const deleteTaskHandle = (id) => {
  //   setTasksData(tasks=>tasks.filter(task => task.id !== id));
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>

      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            toggleIsTaskComplete={toggleIsTaskComplete}
            deleteTaskHandle={deleteTaskHandle}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
