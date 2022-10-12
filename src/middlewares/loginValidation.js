import loginSchema from "../schemas/loginSchema.js";

function validateLogin(req, res, next) {
  const user = req.body;

  const validation = loginSchema.validate(user, { abortEarly: true });

  if (validation.error) {
    console.log(validation.error.details[0].message);
    return res.status(422).send(validation.error.details[0].message);
  }

  next();
}

export default validateLogin;
