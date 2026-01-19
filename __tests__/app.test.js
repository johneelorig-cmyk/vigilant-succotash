const request = require('supertest');
const app = require('../index');

describe('Express App', () => {
  describe('GET /', () => {
    it('should return 200 status', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
    });

    it('should return HTML content', async () => {
      const response = await request(app).get('/');
      expect(response.type).toBe('text/html');
    });

    it('should include haiku content', async () => {
      const response = await request(app).get('/');
      expect(response.text).toContain('rain in seattle');
    });

    it('should render haikus from haikus.json', async () => {
      const response = await request(app).get('/');
      expect(response.text).toMatch(/rain in seattle|my tunes on repeat|snow is still falling/);
    });
  });

  describe('Static Files', () => {
    it('should serve static files from public directory', () => {
      // Verify that express.static middleware is configured
      const staticMiddleware = app._router.stack.find(
        layer => layer.name === 'serveStatic'
      );
      expect(staticMiddleware).toBeDefined();
    });
  });

  describe('View Engine', () => {
    it('should use EJS as the view engine', () => {
      expect(app.get('view engine')).toBe('ejs');
    });
  });
});
