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

// Definir un esquema para usuarios
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
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
    password: { type: String, required: true },
    isProvider: { type: Boolean, default: false }
});

// Definir un esquema para proveedores de servicios
const proveedorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    descripcion: { type: String, required: true },
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
    password: { type: String, required: true },
    isProvider: { type: Boolean, default: true }
});

// Definir un esquema para los servicios
const servicioSchema = new Schema({
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true },
    tipo_servicio:  { type: String, required: true },
    precio: { type: Number, required: true },
    tipo_animal:  { type: String, required: true },
    barrio: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    mail_contacto: { type: String, required: true, match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido'] },
    frecuencia: { type: String, required: true },
    duracion: { type: String, required: true },
    nombre_contacto: { type: String, required: true },
    descripcion_general: { type: String, required: true },
    activo: { type: Boolean, default: true }
});

// Definir el esquema para los mensajes al proveedor
const MensajeAlProveedorSchema = new Schema({
    servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    serviceType: { type: String, required: true },  
    price: { type: String, required: true },  
    animal: { type: String, required: true },  
    proveedorMail: { type: String, required: true }, 
    mensaje: { type: String, required: true },   
    fecha_envio: { type: Date, default: Date.now }  
});

// Middleware para encriptar la contraseña antes de guardar (usuarios)
usuarioSchema.pre('save', async function (next) {
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

// Middleware para encriptar la contraseña antes de guardar (proveedores)
proveedorSchema.pre('save', async function (next) {
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

// Indice de texto para buscar servicio
servicioSchema.index({ nombre_contacto: 'text', tipo_servicio: 'text', descripcion_general: 'text' });

// Definir un esquema para las contrataciones
const contratacionSchema = new Schema({
    servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Servicio', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fecha_contratacion: { type: Date, default: Date.now },
    estado: { type: String, default: 'pendiente' }
});

// Crear modelos
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Proveedor = mongoose.model('Proveedor', proveedorSchema);
const Servicio = mongoose.model('Servicio', servicioSchema);
const Contratacion = mongoose.model('Contratacion', contratacionSchema);
const MensajeAlProveedor = mongoose.model('MansajeAlProveedor', MensajeAlProveedorSchema);

// Ruta para el registro de usuario
app.post('/registerUser', async (req, res) => {
    const { nombre, apellido, mascota, edad_mascota, pais, provincia, ciudad, barrio, direccion, mail, password, isProvider } = req.body;
    try {
        const existingUser = await Usuario.findOne({ mail });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }
        const newUser = new Usuario({ nombre, apellido, mascota, edad_mascota, pais, provincia, ciudad, barrio, direccion, mail, password, isProvider });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para el registro de proveedor
app.post('/registerProvider', async (req, res) => {
    const { nombre, apellido, servicio, descripcion, pais, provincia, ciudad, barrio, direccion, mail, password, isProvider } = req.body;
    try {
        const existingProvider = await Proveedor.findOne({ mail });
        if (existingProvider) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }
        const newProvider = new Proveedor({ nombre, apellido, servicio, descripcion, pais, provincia, ciudad, barrio, direccion, mail, password, isProvider });
        await newProvider.save();
        res.status(201).json({ message: 'Proveedor registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar proveedor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Ruta para el inicio de sesión
app.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    try {
        let user = await Usuario.findOne({ mail });
        let isProvider = false;

        if (user === null) {
            // Si no se encontró en Usuario, buscamos en Proveedor
            user = await Proveedor.findOne({ mail });
            isProvider = true;
        }
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        
        // Generar token JWT
        const token = jwt.sign({ mail: user.mail, isProvider }, 'secreto', { expiresIn: '1h' });
        
        // Enviar respuesta con token, isProvider, nombre, apellido y mail
        res.json({
            token,
            isProvider,
            nombre: user.nombre,
            apellido: user.apellido,
            mail: user.mail
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Ruta para el registro de servicios
app.post('/registerService', async (req, res) => {
    const { mail, password, tipo_servicio, precio, tipo_animal, barrio, direccion, telefono, mail_contacto, frecuencia, duracion, nombre_contacto, descripcion_general } = req.body;
    try {
        // Verificar el proveedor
        const proveedor = await Proveedor.findOne({ mail });
        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        
        // Verificar la contraseña del proveedor
        const match = await bcrypt.compare(password, proveedor.password);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Crear un nuevo servicio
        const newService = new Servicio({ 
            proveedor: proveedor._id, 
            tipo_servicio, 
            precio, 
            tipo_animal, 
            barrio, 
            direccion, 
            telefono, 
            mail_contacto,
            frecuencia,
            duracion,
            nombre_contacto, 
            descripcion_general 
        });
        await newService.save();
        res.status(201).json({ message: 'Servicio registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar servicio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para contratar un servicio
app.post('/hireService', verifyToken, async (req, res) => {
    const { serviceId, userMail } = req.body;

    try {
        const usuario = await Usuario.findOne({ mail: userMail });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const servicio = await Servicio.findById(serviceId);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        const newContratacion = new Contratacion({
            servicio: servicio._id,
            usuario: usuario._id
        });

        await newContratacion.save();

        res.status(201).json({ message: 'Servicio contratado exitosamente' });
    } catch (error) {
        console.error('Error al contratar el servicio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.get('/contratos', verifyToken, async (req, res) => {
    const { mail } = req.user; // Usar el mail del usuario desde el token
    try {
        const usuario = await Usuario.findOne({ mail });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const contratos = await Contratacion.find({ usuario: usuario._id }).populate('servicio');
        res.json(contratos);
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para eliminar un contrato por ID
app.delete('/contratos/:id', verifyToken, async (req, res) => {
    const contratId = req.params.id;
    const { mail } = req.user;

    try {
        const usuario = await Usuario.findOne({ mail });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const contrat = await Contratacion.findOneAndDelete({ _id: contratId, usuario: usuario._id });
        if (!contrat) {
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }

        res.status(200).json({ message: 'Contrato eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar el contrato:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para buscar servicios
app.get('/searchServices', async (req, res) => {
    const query = req.query.query;
    try {
      const services = await Servicio.find({ $text: { $search: query } });
      res.json(services);
    } catch (error) {
      console.error('Error al buscar servicios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


// Ruta para obtener los servicios de un proveedor
app.get('/myServices', verifyToken, async (req, res) => {
    const { mail } = req.user;
    try {
        const proveedor = await Proveedor.findOne({ mail });
        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        const servicios = await Servicio.find({ proveedor: proveedor._id });
        res.json(servicios);
    } catch (error) {
        console.error('Error al obtener los servicios del proveedor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para eliminar un servicio por ID
app.delete('/services/:id', verifyToken, async (req, res) => {
    const serviceId = req.params.id;
    const { mail } = req.user;

    try {
        const proveedor = await Proveedor.findOne({ mail });
        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        const service = await Servicio.findOneAndDelete({ _id: serviceId, proveedor: proveedor._id });
        if (!service) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        res.status(200).json({ message: 'Servicio eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para enviar mensaje al proveedor
app.post('/sendMessageToProvider', verifyToken, async (req, res) => {
    const { serviceId, userMail, serviceType, price, animal, proveedorMail, mensaje } = req.body;

    try {
        const usuario = await Usuario.findOne({ mail: userMail });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const servicio = await Servicio.findById(serviceId);
        if (!servicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        // Crear un nuevo mensaje
        const newMensaje = new MensajeAlProveedor({
            servicio: servicio._id,
            usuario: usuario._id,
            serviceType,
            price,
            animal,
            proveedorMail,
            mensaje
        });

        // Guardar el mensaje en la base de datos
        await newMensaje.save();

        res.status(201).json({ message: 'Mensaje enviado al proveedor' });
    } catch (error) {
        console.error('Error al enviar mensaje al proveedor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


// Ruta para obtener mensajes del proveedor logueado
app.get('/messages/:mail', verifyToken, async (req, res) => {
    const { mail } = req.params;
  
    try {
        const mensajes = await MensajeAlProveedor.find({ proveedorMail: mail }).populate('servicio usuario');
        res.json(mensajes);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//======================================================================0
// Middleware para encriptar la contraseña antes de guardar (usuarios)
usuarioSchema.pre('save', async function (next) {
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

// Middleware para encriptar la contraseña antes de guardar (proveedores)
proveedorSchema.pre('save', async function (next) {
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
// ========================================================================
// Verificar token middleware
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
  
    const tokenWithoutBearer = token.replace('Bearer ', '');
  
    jwt.verify(tokenWithoutBearer, 'secreto', (err, decoded) => {
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
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
