// Local development entry point.
// (Vercel uses api/index.js instead - see that file.)
import app from './app.js';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`✅ Server started at: http://localhost:${port}`);
});
