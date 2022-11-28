import html from '../core.js'
import {connect} from '../store.js'

function TodoItem( {todo, index, editIndex} ) {
    return html `
    
					<li  class="${todo.completed && 'completed'} ${editIndex === index && 'editing'}">
						<div class="view">

							<input class="toggle" type="checkbox" ${todo.completed && 'checked'} 
							onchange="dispatch('toggle', ${index})">
							
							<label ondblclick="dispatch('startEditing', ${index})">${todo.title}</label>
							<button class="destroy" onclick="dispatch('destroy', ${index})"></button>
						</div>
						<input value="${todo.title}" class="edit" onblur="dispatch('endEdit', this.value.trim())"  onkeyup="event.keyCode === 13 && dispatch('endEdit', this.value.trim())" value="${todo.title}">
					</li>
					
			
   
    `


}

export default connect()(TodoItem)
