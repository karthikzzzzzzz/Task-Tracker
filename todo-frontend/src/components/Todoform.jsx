import React, { useState,useEffect } from "react";
import './Todoform.css';

const TodoForm = () => {
    const [todo, setTodo] = useState([]);
    const [task, setTask] = useState("");
 


    useEffect(() => {
        const fetchStudies = async () => {
            const response = await fetch('/api/get-tasks');
            const tasks= await response.json();
            console.log(tasks)
            setTodo(tasks);

        }
        fetchStudies();
    }, [])

    const addTask = async () => {
        if (task.trim()) {
            const newTask = { title: task, completed: false };
            try {
                const response = await fetch('/api/create-task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTask),  
                });

                if (response.ok) {
                    const createdTask = await response.json();
                    setTodo([...todo, createdTask]);
                    setTask(""); 
                } else {
                    console.error("Error creating task:", response.statusText);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`/api/delete-tasks/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const newTodoList = todo.filter((task) => task.id !== id);
                setTodo(newTodoList); 
            } else {
                console.error("Error deleting task:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updateStatus = async (id) => {
        try {
            const response = await fetch(`/api/update-status?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const updatedTask = await response.json();
                setTodo(todo.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                ));
            } else {
                console.error("Error updating task status:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <h1>My Productivity Hub</h1>
            <div className="inner-container">
                <input className='input-container' type="text" placeholder="Enter a task item" value={task} onChange={(e) => setTask(e.target.value)}/>
                <button className='add-button' onClick={addTask}>Add</button>
            </div>
            <div className="task">
                {todo.map((task) => (
                    <div className='task-container' key={task.id}>
                        <p className="task-title">{task.title}</p>
                        <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
                        <input className='task-checkbox' type="checkbox" placeholder="check me" value={task.completed} onChange={() => updateStatus(task.id, task.completed)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoForm;
