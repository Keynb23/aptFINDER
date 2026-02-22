// frontend/src/schemas/inputSchema.js
import { z } from 'zod';

/**
 * @description Schema for validating commute parameters.
 * Ensures times are positive and addresses aren't empty.
 */
export const commuteSchema = z.object({
  userATime: z.number().min(5).max(120).default(45),
  userBTime: z.number().min(5).max(120).default(25),
  addressA: z.string().min(5),
  addressB: z.string().min(5),
});