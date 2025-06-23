// models/todo.js
var connection = require('../connection');

function Todo() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      // ✅ AJOUT: Vérifier l'erreur de connexion AVANT d'utiliser con
      if (err) {
        console.error('ERROR: Failed to acquire database connection:', err);
        res.status(500).send({ 
          status: 1, 
          message: 'Database connection error',
          error: err.message 
        });
        return;
      }

      console.log('Executing SELECT query on todo_list');
      con.query('select * from todo_list', function(err, result) {
        con.release();
        
        if (err) {
          console.error('ERROR: Query execution failed:', err);
          res.status(500).send({ 
            status: 1, 
            message: 'Database query error',
            error: err.message 
          });
          return;
        }
        
        console.log('Query successful, returning', result.length, 'todos');
        res.send(result);
      });
    });
  };

  this.create = function(todo, res) {
    connection.acquire(function(err, con) {
      if (err) {
        console.error('ERROR: Failed to acquire database connection for CREATE:', err);
        res.status(500).send({ status: 1, message: 'Database connection error' });
        return;
      }

      con.query('insert into todo_list set ?', todo, function(err, result) {
        con.release();
        if (err) {
          console.error('ERROR: CREATE query failed:', err);
          res.send({status: 1, message: 'TODO creation failed', error: err.message});
        } else {
          console.log('TODO created successfully');
          res.send({status: 0, message: 'TODO created successfully'});
        }
      });
    });
  };

  this.update = function(todo, res) {
    connection.acquire(function(err, con) {
      if (err) {
        console.error('ERROR: Failed to acquire database connection for UPDATE:', err);
        res.status(500).send({ status: 1, message: 'Database connection error' });
        return;
      }

      con.query('update todo_list set ? where id = ?', [todo, todo.id], function(err, result) {
        con.release();
        if (err) {
          console.error('ERROR: UPDATE query failed:', err);
          res.send({status: 1, message: 'TODO update failed', error: err.message});
        } else {
          console.log('TODO updated successfully');
          res.send({status: 0, message: 'TODO updated successfully'});
        }
      });
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      if (err) {
        console.error('ERROR: Failed to acquire database connection for DELETE:', err);
        res.status(500).send({ status: 1, message: 'Database connection error' });
        return;
      }

      con.query('delete from todo_list where id = ?', [id], function(err, result) {
        con.release();
        if (err) {
          console.error('ERROR: DELETE query failed:', err);
          res.send({status: 1, message: 'Failed to delete', error: err.message});
        } else {
          console.log('TODO deleted successfully');
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Todo();
