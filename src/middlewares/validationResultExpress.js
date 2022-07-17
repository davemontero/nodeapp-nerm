import { validationResult } from "express-validator"

export const validationResultExpress = (req,res,next) => (!validationResult(req).isEmpty()) ? res.status(400).json({ errors: validationResult(req).array()}) : next()