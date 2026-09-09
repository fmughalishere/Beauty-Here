// Vercel serverless entry point.
// vercel.json rewrites every request to this function; Express's own
// routing (see app.js) then matches the original path.
import app from '../app.js';

export default app;
