function validateJson(jsonObject, schema) {
    const Ajv = require("ajv")
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    return validate(jsonObject)
}

module.exports = { validateJson } 