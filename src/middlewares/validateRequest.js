const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formated = result.error.format();
      const arrayErrors = Object.values(formated);
      const errors = arrayErrors
        .flat()
        .map((err) => err._errors)
        .filter(Boolean)
        .flat();
      res.status(500).json({
        status: "error",
        message: errors.join(", "),
      });
    }
    next();
  };
};
export default validateRequest;
