// app.js

// === THIS IS THE CORRECT PLACE FOR DOTENV ===
// Load environment variables before anything else happens.
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config({ path: '.env.local' });
}

// Now, the rest of your application can start
var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection'); // <-- This now runs AFTER .env is loaded
var routes = require('./routes.js');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();

// Add HTML frontend route BEFORE API routes
app.get('/', function(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AWS Todo App</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .container { background: #f5f5f5; padding: 20px; border-radius: 8px; }
            .todo-item { background: white; margin: 10px 0; padding: 15px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; }
            .completed { text-decoration: line-through; color: #888; }
            input[type="text"] { width: 70%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #0056b3; }
            .delete-btn { background: #dc3545; }
            .delete-btn:hover { background: #c82333; }
            .status { color: #28a745; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 AWS Todo App</h1>
            <p class="status">✅ Connected to AWS RDS MySQL Database</p>
            <p><strong>Infrastructure:</strong> EC2 (${process.env.NODE_ENV || 'development'}) + RDS MySQL + VPC</p>
            
            <div>
                <input type="text" id="todoInput" placeholder="Enter a new todo..." />
                <button onclick="addTodo()">Add Todo</button>
            </div>
            
            <div id="todoList"></div>
        </div>

        <script>
            const API_BASE = window.location.origin;
            
            // Load todos when page loads
            window.onload = loadTodos;
            
            async function loadTodos() {
                try {
                    const response = await fetch(API_BASE + '/todo/');
                    const todos = await response.json();
                    displayTodos(todos);
                } catch (error) {
                    console.error('Error loading todos:', error);
                }
            }
            
            function displayTodos(todos) {
                const todoList = document.getElementById('todoList');
                todoList.innerHTML = '';
                
                if (todos.length === 0) {
                    todoList.innerHTML = '<p>No todos yet. Add one above!</p>';
                    return;
                }
                
                todos.forEach(todo => {
                    const todoDiv = document.createElement('div');
                    todoDiv.className = 'todo-item';
                    todoDiv.innerHTML = \`
                        <span class="\${todo.status ? 'completed' : ''}">\${todo.task}</span>
                        <div>
                            <button onclick="toggleTodo(\${todo.id}, \${!todo.status})">\${todo.status ? 'Undo' : 'Complete'}</button>
                            <button class="delete-btn" onclick="deleteTodo(\${todo.id})">Delete</button>
                        </div>
                    \`;
                    todoList.appendChild(todoDiv);
                });
            }
            
            async function addTodo() {
                const input = document.getElementById('todoInput');
                const task = input.value.trim();
                
                if (!task) return;
                
                try {
                    const response = await fetch(API_BASE + '/todo/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ task: task, status: false })
                    });
                    
                    const result = await response.json();
                    if (result.status === 0) {
                        input.value = '';
                        loadTodos();
                    }
                } catch (error) {
                    console.error('Error adding todo:', error);
                }
            }
            
            async function toggleTodo(id, newStatus) {
                try {
                    await fetch(API_BASE + '/todo/', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: id, status: newStatus })
                    });
                    loadTodos();
                } catch (error) {
                    console.error('Error updating todo:', error);
                }
            }
            
            async function deleteTodo(id) {
                try {
                    await fetch(API_BASE + '/todo/' + id + '/', {
                        method: 'DELETE'
                    });
                    loadTodos();
                } catch (error) {
                    console.error('Error deleting todo:', error);
                }
            }
            
            // Allow Enter key to add todo
            document.getElementById('todoInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTodo();
                }
            });
        </script>
    </body>
    </html>
  `);
});

routes.configure(app);

var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});
