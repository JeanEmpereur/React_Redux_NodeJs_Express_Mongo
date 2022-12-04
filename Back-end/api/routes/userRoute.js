module.exports = (server) => {
  const userController = require('../controllers/userController');
  const jwtMiddleware = require('../middleware/jwtMiddleware');

  server.post('/users/register', userController.user_register)

  server.post('/users/login', userController.user_login)

  server.route('/users')
  .all(jwtMiddleware.verify_token)
  .get(userController.get_all_user);

  server.route('/users/:user_id') // req.params.user_id
  .all(jwtMiddleware.verify_token)
  .get(userController.get_a_user)
  .put(userController.update_a_user)
  .delete(userController.delete_a_user);

}
