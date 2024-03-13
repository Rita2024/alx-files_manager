import express from 'express';
// Import only necessary controllers
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
// Import specific middleware functions
import basicAuthenticate from '../middlewares/auth/basicAuthenticate';
import xTokenAuthenticate from '../middlewares/auth/xTokenAuthenticate';
import errorResponse from '../middlewares/error/errorResponse';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {express.Application} api
 */
const injectRoutes = (api) => {
  // Group routes using a router for better organization
  const router = express.Router();

  router.get('/status', AppController.getStatus);
  router.get('/stats', AppController.getStats);

  router.get('/connect', basicAuthenticate, AuthController.getConnect);
  router.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

  router.post('/users', UsersController.postNew);
  router.get('/users/me', xTokenAuthenticate, UsersController.getMe);

  router.post('/files', xTokenAuthenticate, FilesController.postUpload);
  router.get('/files/:id', xTokenAuthenticate, FilesController.getShow);
  router.get('/files', xTokenAuthenticate, FilesController.getIndex);
  router.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
  router.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
  router.get('/files/:id/data', FilesController.getFile);

  // Handle 404 errors for unmatched routes
  router.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });

  // Apply error middleware globally
  api.use(errorResponse);

  // Mount the router to the application
  api.use('/api', router); // Example path prefix for API routes
};

export default injectRoutes;
