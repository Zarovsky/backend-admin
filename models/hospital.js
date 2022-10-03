const { Schema, model } = require("mongoose");

const HospitalSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    // usuario que crea el hospital
    usuario: {
      required: true,
      // relacionado con el esquema de usuario
      type: Schema.Types.ObjectId,
      ref: "Usuario"
    }
  },
  // para que no le cambie el nombre mongo, que le mete una s
  { collection: "hospitales" }
);

// mongo le mete un guión bajo, para quitarlo...
// hacerlo con función normal, no de flecha ya que no apuntaría a la estancia creada
HospitalSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

// lo exportamos con su esquema
module.exports = model("Hospital", HospitalSchema);
