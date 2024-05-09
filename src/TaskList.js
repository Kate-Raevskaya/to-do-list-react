import { Task } from "./Task";
import {useState} from "react";
import './taskList.css';

let nextId = 0;

export default function TaskList() {
    const [task, setTask] = useState('');
    const [tasksList, setTasksList] = useState([]);


    function handleAddTaskButton() {
        setTasksList([
            ...tasksList,
            {id: nextId++, taskText: task}
        ]);
        setTask('');
    }

    function handleDeleteButton(taskId) {
        setTasksList(
            tasksList.filter(task => task.id !== taskId)
        );
    }

    function handleChangeButton(newTask) {
        setTasksList(tasksList.map(t => {
            if (t.id === newTask.id) {
                return newTask;
            } else {
                return t;
            }
        }))
    }

    return (
        <>
            <h1 className="hider">To-Do List</h1>
            <div className="add-task">
                <input
                    className='input-task'
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleAddTaskButton();
                        }
                    }}
                />
                <button onClick={handleAddTaskButton} className='add-task-button'>Add task</button>
            </div>
            <ul>
                {tasksList.map(task => (
                    <Task
                        task={task}
                        onDeleteButton={handleDeleteButton}
                        onChangeButton={handleChangeButton} />
                )) }
            </ul>
        </>
    )
}