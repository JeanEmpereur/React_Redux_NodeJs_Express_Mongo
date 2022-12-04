const Product = require('../models/productModel');

exports.list_all_product = (req, res) => {
  Product.find({}, (error, products) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else{
      res.status(200);
      res.json(products)
      console.log("get all products");
    }
  })

  // Product.find({})
  // .then(products => {
  //   res.status(200);
  //   res.json(products)
  // })
  // .catch(error => {
  //   res.status(500);
  //   console.log(error);
  //   res.json({message: "Erreur serveur."})
  // })
}

exports.create_a_product = (req, res) => {
  let new_Product = new Product(req.body);

  new_Product.save()
  .then(product => {
    res.status(201);
    res.json(product);
    console.log("product saved");
  })
  .catch(error => {
    res.status(500);
    console.log(error);
    res.json({message: "Erreur serveur."})
  })
}

exports.get_a_product = (req, res) => {
  // let product_id = req.params.product_id;
  let {product_id} = req.params;

  // Product.findOne({_id : product_id}, (error, products) => {
  Product.findById(product_id, (error, product) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else{
      res.status(200);
      res.json(product)
      console.log("get one product");
    }
  })
}

exports.update_a_product = (req, res) => {
  // Product.findOneAndUpdate({_id: req.params.product_id}, req.body, {new: true}, (error, product) => {
  Product.findByIdAndUpdate(req.params.product_id, req.body, {new: true}, (error, product) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      res.status(200);
      res.json(product);
      console.log("updated product");
    }
  })
}

exports.delete_a_product = (req, res) => {
  Product.remove({_id: req.params.product_id}, (error) => {
    if(error){
      res.status(500);
      console.log(error);
      res.json({message: "Erreur serveur."})
    }
    else {
      res.status(200);
      res.json({message: "Product deleted"});
      console.log("delete a product");
    }
  })
}
