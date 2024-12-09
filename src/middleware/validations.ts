import { Response, Request, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

/**
 * Middleware to validate request data using a Zod schema.
 * @param schema - A Zod schema to validate the request data.
 * @param key - The key of the request object to validate (e.g., 'body', 'query', 'params').
 */
const validate =
  (schema: ZodSchema, key: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the data from the request
      schema.parse(req[key]);
      next(); // Continue if validation passes
    } catch (err) {
      if (err instanceof ZodError) {
        // Return a 400 response with validation errors
        return res.status(400).json({
          message: "Validation error",
          errors: err.errors,
        });
      }
      next(err); // Forward other errors
    }
  };

export default validate;
