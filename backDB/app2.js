import bcrypt from 'bcrypt';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors';

// Crear una instancia de Express
const app = express();

// Permitir solicitudes desde cualquier origen
app.use(cors());

// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/usuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
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
    pais: { type: String, required: true },
    provincia: { type: String, required: true },
    ciudad: { type: String, required: true },
    barrio: { type: String, required: true },
    direccion: { type: String, required: true },
    activo: { type: Boolean, default: true },
    mail: {
        type: String,
        required: true,
        unique: true, // Asegura que el correo sea único
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

// Ruta para el registro de usuario
app.post('/register', async (req, res) => {
    const { nombre, apellido, mascota, edad_mascota, pais, provincia, ciudad, barrio, direccion, mail, password } = req.body;
    try {
        const existingUser = await Ejemplo.findOne({ mail });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }
        const newUser = new Ejemplo({ nombre, apellido, mascota, edad_mascota, pais, provincia, ciudad, barrio, direccion, mail, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para el inicio de sesión
app.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    try {
        const user = await Ejemplo.findOne({ mail });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        // Generar token JWT
        const token = jwt.sign({ mail: user.mail }, 'secreto');
        res.json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Verificar token middleware
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        req.user = decoded;
        next();
    });
}

// Ruta protegida
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Ruta protegida' });
});

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
