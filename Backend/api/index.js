// Vercel serverless entry point.
// vercel.json rewrites every request to this function; Express's own
// routing (see app.js) then matches the original path.
import app from '../app.js';

// IMPORTANT: Vercel's Node.js runtime auto-parses the request body (and
// consumes the raw stream while doing it) before handing the request to
// our handler. That collides with Express's own express.json() middleware
// in app.js, which then never sees any data - this is what was silently
// breaking every POST/PUT route (register, login, the AI quiz, etc.) while
// GET routes kept working fine (no body to consume/collide over).
// Disabling Vercel's built-in body parser lets Express parse the raw body
// itself, the normal way.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;
