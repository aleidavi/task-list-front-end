import { useState } from 'react';

const NewTaskForm = ({ handleSubmit }) => {
//  const [name, setName] = useState('');
  const kDefaultFormState = {
    title: '',
    id: '',
    isComplete: '',
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
        <label htmlFor="id">Task ID: </label>
        <input type="number" id="id" name="id" value={formData.id} onChange={handleFormChange}/>
      </div>
      <div>
        <label htmlFor="isComplete">Task Is Complete: </label>
        <input type="text" id="isComplete" name="isComplete" value={formData.isComplete} onChange={handleFormChange}/>
      </div>
      <div>
        <input type="submit" value="add task" />
      </div> 
    </form>
  );

};

export default NewTaskForm;