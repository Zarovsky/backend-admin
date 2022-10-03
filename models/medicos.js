

const { Schema, model } = require('mongoose');

const MedicoSchema = Schema(
    {
        nombre: {
            type: String,
            required: true
        },
         img: {
            type: String
        },
        usuario: {
            // relacionado con el esquema de usuario
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        hospital: {
            // relacionado con el esquema de usuario
            type: Schema.Types.ObjectId,
            ref: 'Hospital',
            required: true
        }

    }, { collection: 'medicos' });

    // mongo le mete un guión bajo, para quitarlo...
    // hacerlo con función normal, no de flecha ya que no apuntaría a la estancia creada
    MedicoSchema.method('toJSON', function() {
        const { __v, ...object} = this.toObject();
        return object;
    });

    // lo exportamos con su esquema
    module.exports = model('Medico', MedicoSchema);
