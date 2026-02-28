const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (error) {
    console.log(error.issues)

    const error_ = {
        status: 400,
        message: "fill the input properly",
        extraDetails: error.issues[0].message
    }

    // return res.status(400).json({
    //   message: error.issues[0].message,
    // });
    next(error_)
  }
};

module.exports = validate;