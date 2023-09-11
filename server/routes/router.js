const express = require("express");
const {
  getProducts,
  getProductById,
  addProduct,
  getProductsByCategory,
  getProductBySeller
} = require("../controllers/product-controller");
const {
  addActivity,
  getActivity
} = require("../controllers/userActivityController");
const {
  getRewards,
  addReward
} = require("../controllers/reward-controller");
const {
  addItem,
  removeItem,
  removeAllItem,
  getCartItems,
} = require("../controllers/cart-controller");

const {
  addItem: addItemWishlist,
  removeItem: removeItemWishlist,
  getWishlistItems,
} = require("../controllers/wishlist-controller");

const {
  signup,
  login,
  logout,
  loginWithMobileNumber,
  isExistPhone,
  authentication,
  updateUserInfo,
  updateEmail,
} = require("../controllers/user-controller");

const {
  addNewAddress,
  getAddress,
  deleteAddress,
} = require("../controllers/address-controller");

const {
  completeOrder,
  getOrderDetails,
  getOrders,
} = require("../controllers/order-controller");

const {
  paytmGatway,
  paytmDataResponse,
} = require("../controllers/payment-controller");

const {
  addApproval,
  getApprovals,
  deleteApproval
} = require("../controllers/approve-controller")


const { isSpinned, setSpin } = require("../controllers/spinController");
const {addChallange,getChallange,getBrandsInfo,resetBrand} = require("../controllers/challange-controller")
const{getBrandRequest,addRequest,delRequest} = require("../controllers/brand-request-controller");

const router = express.Router();

//User Account related routes

router.post("/accounts/signup", signup);
router.post("/accounts/login", login);
router.post("/accounts/login-with-phone", loginWithMobileNumber);
router.post("/accounts/check-phone", isExistPhone);
router.get("/accounts/authentication", authentication);
router.get("/accounts/logout", logout);
router.patch("/accounts/update-user-info", updateUserInfo);
router.patch("/accounts/update-email", updateEmail);
router.post('/activity/add',addActivity)
router.get('/activity/get',getActivity)



// spinnnig 

router.get("/accounts/spin",isSpinned);
router.get("/accounts/setspin",setSpin);
router.get("/rewards/get-rewards",getRewards);
router.post("/rewards/add-reward",addReward);
//Product related routes

router.get("/products/get-products", getProducts);
router.get("/products/get-products/:categoryName", getProductsByCategory);
router.get("/products/get-product/:id", getProductById);
router.post("/products/add-product", addProduct);
router.get("/products/getProductSeller/:sellerid",getProductBySeller)

router.post("/addChallange",addChallange)
router.get("/getChallange",getChallange);
router.get('/brand/getinfo',getBrandsInfo);
router.delete('/brand/reset',resetBrand); 
router.get('/seller/getbrandreq',getBrandRequest);
router.post('/seller/addbrand',addRequest);
router.delete('/seller/delbrand/:id',delRequest);

//Cart related routes
router.post("/cart/add-item", addItem);
router.delete("/cart/remove-item", removeItem);
router.delete("/cart/clear-cart", removeAllItem);
router.get("/cart/get-items/:id", getCartItems);

//Wishlist related routes
router.post("/wishlist/add-item", addItemWishlist);
router.delete("/wishlist/remove-item", removeItemWishlist);
router.get("/wishlist/get-items/:id", getWishlistItems);

//Address related routes
router.post("/address/add-address", addNewAddress);
router.get("/address/get-addresses/:id", getAddress);
router.delete("/address/delete-address", deleteAddress);

//orders related routes

router.post("/orders/complete-order", completeOrder);
router.post("/orders/get-order-details", getOrderDetails);
router.get("/order/allorders",getOrders);

//Payment related routes
router.post("/payment/paytm", paytmGatway);
router.post("/payment/paytmresponse", paytmDataResponse);

router.post("/approve/add-approve", addApproval);
router.get("/approve/get-approve", getApprovals);
router.delete("/approve/del-approve/:id", deleteApproval);

module.exports = router;