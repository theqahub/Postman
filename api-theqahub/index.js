const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); 

let users = [
  { id: 1, name: "Diego", email: "diego.sanchez@theqahub.es" },
];

// GET: obtener todos los usuarios
app.get('/users', (req, res) => {
  res.json(users);
});

// GET: obtener un solo usuario por ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ message: 'Usuario no encontrado' });
});

// POST: crear un nuevo usuario
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT: reemplazar completamente un usuario
app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { id: users[index].id, ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// PATCH: actualizar parcialmente un usuario
app.patch('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// DELETE: eliminar un usuario
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: 'Usuario eliminado' });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
