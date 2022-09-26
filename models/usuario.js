
const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required:true
        },
        email: {
            type: String,
            required:true,
            unique: true
        },
        password: {
            type: String,
            required:true
        },
        img: {
            type: String
        },
        role: {
            type: String,
            required:true,
            default: 'USER_ROLE'
        },
        google: {
            type: Boolean,
            default: false
        }
    });

    // mongo le mete un guión bajo, para quitarlo...
    // hacerlo con función normal, no de flecha ya que no apuntaría a la estancia creada
    UsuarioSchema.method('toJSON', function() {
        const { __v, _id, password, ...object} = this.toObject();

        // para no perder el Id
        object.uid = _id;

        return object;
    })

    // lo exportamos con su esquema
    module.exports = model('Usuario', UsuarioSchema);


