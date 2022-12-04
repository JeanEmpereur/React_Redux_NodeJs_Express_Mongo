module.exports = (server) => {
  const productController = require('../controllers/productController');
  const jwtMiddleware = require('../middleware/jwtMiddleware');

  server.route('/products')
  .all(jwtMiddleware.verify_token)
  .get(productController.list_all_product)
  .post(productController.create_a_product);

  server.route('/products/:product_id') // req.params.product_id
  .all(jwtMiddleware.verify_token)
  .get(productController.get_a_product)
  .put(productController.update_a_product)
  .delete(productController.delete_a_product);
}
