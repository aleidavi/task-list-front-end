import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, toggleIsTaskComplete, deleteTaskHandle }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
		  description={task.description}
          title={task.title}
          isComplete={task.isComplete}

          toggleIsTaskComplete={toggleIsTaskComplete}
          deleteTaskHandle={deleteTaskHandle}
        />
      );
    });
  };

  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};


TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
	  description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  toggleIsTaskComplete: PropTypes.func.isRequired,
  deleteTaskHandle: PropTypes.func.isRequired
};

export default TaskList;
