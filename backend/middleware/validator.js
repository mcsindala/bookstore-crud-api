import {z} from 'zod';
// 1. Define the Book Validation Schema matching your SQL constraints
const bookSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title cannot be empty')
    .max(255, 'Title cannot exceed 255 characters'),

  author: z
    .string({ required_error: 'Author is required' })
    .min(1, 'Author cannot be empty')
    .max(255, 'Author cannot exceed 255 characters'),

  // ISBN is optional/nullable in your DB, max 50 chars
  isbn: z
    .string()
    .max(50, 'ISBN cannot exceed 50 characters')
    .optional()
    .nullable(),

  // Price is a decimal. This checks if it's a number (or string that converts to a number)
  // and ensures it's a positive value.
  price: z.coerce // Automatically converts string inputs like "19.99" from forms into a real number
    .number({ invalid_type_error: 'Price must be a valid number' })
    .positive('Price must be greater than 0')
    .optional()
    .nullable(),
});

// 2. A reusable middleware function that takes any Zod schema
const validate = (schema) => {
  return (req, res, next) => {
    // safeParse checks the data without throwing a hard crash error
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Formats Zod errors into a clean, readable object for your API client
      const errorMessages = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        status: 'fail',
        errors: errorMessages,
      });
    }

    // CRITICAL: Overwrite req.body with the cleaned, stripped Zod data.
    // If a user passed an extra field like "id: 99", Zod strips it out.
    req.body = result.data;
    next();
  };
};

// Export both the middleware wrapper and the specific schema
export { validate, bookSchema };

