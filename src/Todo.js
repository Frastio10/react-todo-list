import React from 'react';

export default function Todo({ todo, toggleTodo }){
	const handleTodoClick = () =>{
		toggleTodo(todo.id);
	}

	return (
		<div>
			<label htmlFor={todo.id} className="todo-label border">
				<div className = {"todo-" + todo.complete}></div>
				<input type="checkbox" id={todo.id} checked={todo.complete} onChange={handleTodoClick} className="d-none"/>
				{todo.name}
			</label>
		</div>
	)
};
