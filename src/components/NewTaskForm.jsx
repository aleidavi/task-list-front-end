import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ handleSubmit }) => {
//  const [name, setName] = useState('');
  const kDefaultFormState = {
    title: '',
	description: ''
  };

  	const [formData, setFormData] = useState(kDefaultFormState);

  	const handleFormChange = event => {
	const fieldName = event.target.name;
	const fieldValue = event.target.value;

    const newFormData = {...formData, [fieldName] : fieldValue};
    setFormData(newFormData);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();

    handleSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <div>
        <label htmlFor="title">Task Title: </label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleFormChange}/>
      </div>
      <div>
        <label htmlFor="description">Task description: </label>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleFormChange}/>
      </div>
      {/*<div>
        <label htmlFor="isComplete">Completion Status: </label>
        <input type="text" id="isComplete" name="isComplete" value={formData.isComplete} onChange={handleFormChange}/>
      </div>*/}
      <div>
        <input type="submit" value="add task" />
      </div>
    </form>
  );
};
NewTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
