window.setTimeout(function() {

var todos = ["Study Javascript", "Clean The House", "Game"];

var input = prompt("what would you like to do?");

while (input !== "quit"){
	if(input === "list"){
		listTodos();
	} else if (input === "new"){
		addTodo();
	} else if (input === "delete"){
		deleteTodo();
	}

var input = prompt("what would you like to do?");

}

alert("ok, you quit the app");
console.log("ok, you quit the app");

function listTodos(){
	console.log("**********")
	todos.forEach(function(todo, i){
	console.log(i + ": " + todo);
	});
	console.log("**********")
}

function addTodo(){
	var newTodo = prompt("Enter new todo");
	todos.push(newTodo);
	console.log("New item added");
}

function deleteTodo(){
	var index = prompt("Enter index of todo to delete");
	todos.splice(index,1);
	console.log("Item deleted");
}

}, 500);