//const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';
//const mongoose = require('mongoose');
import mongoose from 'mongoose';

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/usuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
    // Llamar a la función para eliminar todos los usuarios
    //eliminarTodosLosUsuarios()
    return Promise.resolve()
        .then(() => {
            // Llamar a la función para imprimir todos los usuarios después de eliminarlos
            //return imprimirTodosLosUsuarios();
        }).then(() => {
            // Crear y guardar un nuevo documento después de eliminar todos los usuarios
            return guardarNuevoUsuarios();
        }).then(() => {
            // Imprimir todos los usuarios después de guardar uno nuevo
            return imprimirTodosLosUsuarios();
        }).catch((error) => {
            console.error('Error:', error);
        });
    //eliminarTodosLosUsuarios()
}).catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
});

// Definir un esquema
const Schema = mongoose.Schema;
const ejemploSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    mascota: { type: String, required: true },
    edad_mascota: { type: Number, min: 0 },
    activo: { type: Boolean, default: true },
    mail: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido']
    },
    password: { type: String, required: true }
});

// Middleware para encriptar la contraseña antes de guardar
ejemploSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Crear un modelo
const Ejemplo = mongoose.model('Ejemplo', ejemploSchema);

// Función para eliminar todos los usuarios
function eliminarTodosLosUsuarios() {
    return Ejemplo.deleteMany({})
        .then(() => {
            console.log('Todos los usuarios han sido eliminados.');
        })
        .catch((error) => {
            console.error('Error al eliminar usuarios:', error);
        });
}

// Función para imprimir todos los usuarios en la base de datos
function imprimirTodosLosUsuarios() {
    return Ejemplo.find()
        .then((docs) => {
            console.log('Usuarios encontrados:', docs);
        })
        .catch((error) => {
            console.error('Error al consultar usuarios:', error);
        });
}

// Función para crear y guardar un nuevo usuario
function guardarNuevoUsuarios() {
    const nuevoUsuario = new Ejemplo({
        nombre: 'Juan Carlos',
        apellido: 'Sanchez',
        mascota: 'Perro',
        edad_mascota: 3,
        mail: 'juanc.sanchez@example.com',
        password: 'password123'
    });

    return nuevoUsuario.save()
        .then((doc) => {
            console.log('Usuario creado con éxito:', doc);
        })
        .catch((error) => {
            console.error('Error al crear usuario:', error);
        });
}
