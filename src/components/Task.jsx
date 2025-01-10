
import PropTypes from 'prop-types';
import './Task.css';

const Task = ({
  id,
  description,
  title,
  isComplete,
  toggleIsTaskComplete,
  deleteTaskHandle }) => {
  const checkForTaskCompletion = () => {
    toggleIsTaskComplete(id);
  };

  const eventDeleteTask = () => {
    deleteTaskHandle(id);
  };

  const buttonClass = (isComplete) => {
    return isComplete ? 'tasks__item__toggle--completed' : '';
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass(isComplete)}`}

        onClick={checkForTaskCompletion}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={eventDeleteTask}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleIsTaskComplete: PropTypes.func.isRequired,
  deleteTaskHandle: PropTypes.func.isRequired
};

export default Task;
