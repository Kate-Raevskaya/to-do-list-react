import {useState} from "react";
import './task.css';
export function Task({ task, onDeleteButton, onChangeButton }) {
    const [isDone, setIsDone] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskText, setEditTaskText] = useState(task.taskText);

    function handleToggle() {
        setIsDone(!isDone);
    }

    function saveEditedTask() {
        setIsEditing(false);
        onChangeButton({
            ...task,
            taskText: editTaskText
        });
    }

    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    className='edit-input'
                    value={editTaskText}
                    onChange={e => {
                        setEditTaskText(e.target.value);
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            saveEditedTask();
                        }
                    }}
                />
                <button
                    onClick={() => {saveEditedTask()}}
                    className='save-button'>
                </button>
            </>
        );
    } else {
        taskContent = (
            <>
                <p className={isDone ? 'done' : 'active'}>{task.taskText}</p>
                <button
                    onClick={() => {setIsEditing(true)}}
                    className='change-button'>
                </button>
            </>
        );
    }

    return (
        <li key={task.id} className='task'>
            <input
                className='checkbox'
                type="checkbox"
                onChange={handleToggle}
                checked={isDone}
            />
            {taskContent}
            <button
                onClick={() => {onDeleteButton(task.id)}}
                className='delete-button'>
            </button>
        </li>
    )
}