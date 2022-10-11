import userSchema from "../schemas/userSchema.js";

function validateUser(req, res, next) {
  const user = req.body;

  const validation = userSchema.validate(user, { abortEarly: true });

  if (validation.error) {
    console.log(validation.error.details[0].message);
    return res.status(422).send(validation.error.details[0].message);
  }
  next();
}

export default validateUser;
