const loginController = require("../api/controllers/account/login-controller");
const permissionController = require("../api/controllers/account/permission-controller");
const productTypeController = require("../api/controllers/product/type-controller");
const productController = require("../api/controllers/product/product-controller");
const unitController = require("../api/controllers/unit/unit-controller");
const providerController = require("../api/controllers/provider/provider-controller");
const ingredientController = require("../api/controllers/ingredient/ingredient-controller");
const exportReceiptController = require("../api/controllers/export-receipt/export-receipt-controller");
const userController = require("../api/controllers/account/user-controller");
const verifyToken = require("../api/middleware/verifyToken");
const checkPermission = require("../api/middleware/checkPermission");

function routes(app) {
    app.namespace("/api", function () {
        app.post("/login", loginController.getToken);
        app.post("/verify-username", userController.checkUsername);
        // permission
        app.get("/permission", verifyToken, checkPermission("admin"), permissionController.getAllPermission);
        app.get("/permission/:id", verifyToken, checkPermission("admin"), permissionController.getPermission);
        app.post("/permission", verifyToken, checkPermission("admin"), permissionController.createPermission);
        app.patch("/permission/:id", verifyToken, checkPermission("admin"), permissionController.updatePermission);
        app.delete("/permission/:id", verifyToken, checkPermission("admin"), permissionController.deletePermission);
        // user
        app.get("/user", verifyToken, checkPermission("admin"), userController.getAllUser);
        app.post("/user", userController.createUser);
        app.patch("/user/:id", verifyToken, userController.updateUser);
        app.delete("/user/:id", verifyToken, checkPermission("admin"), userController.deleteUser);
        // export receipt
        app.get("/export-receipt/status", verifyToken, checkPermission("admin"), exportReceiptController.getAllStatus);
        app.get("/export-receipt/status/:id", verifyToken, checkPermission("admin"), exportReceiptController.getStatus);
        app.post("/export-receipt/status", verifyToken, checkPermission("admin"), exportReceiptController.createStatus);
        app.patch("/export-receipt/status/:id", verifyToken, checkPermission("admin"), exportReceiptController.updateStatus);
        app.delete("/export-receipt/status/:id", verifyToken, checkPermission("admin"), exportReceiptController.deleteStatus);
        // product
        app.get("/product/type", verifyToken, checkPermission("admin"), productTypeController.getAllType);
        app.get("/product/type/:id", verifyToken, checkPermission("admin"), productTypeController.getType);
        app.post("/product/type", verifyToken, checkPermission("admin"), productTypeController.createType);
        app.patch("/product/type/:id", verifyToken, checkPermission("admin"), productTypeController.updateType);
        app.delete("/product/type/:id", verifyToken, checkPermission("admin"), productTypeController.deleteType);
        app.get("/product/:id", productController.getProduct);
        app.get("/product", productController.getProducts);
        app.post("/product", verifyToken, checkPermission("admin"), productController.createProduct);
        app.patch("/product/:id", verifyToken, checkPermission("admin"), productController.updateProduct);
        app.delete("/product/:id", verifyToken, checkPermission("admin"), productController.deleteProduct);
        // unit
        app.get("/unit", verifyToken, checkPermission("admin"), unitController.getAllUnit);
        app.get("/unit/:id", verifyToken, checkPermission("admin"), unitController.getUnit);
        app.post("/unit", verifyToken, checkPermission("admin"), unitController.createUnit);
        app.patch("/unit/:id", verifyToken, checkPermission("admin"), unitController.updateUnit);
        app.delete("/unit/:id", verifyToken, checkPermission("admin"), unitController.deleteUnit);
        // provider
        app.get("/provider", verifyToken, checkPermission("admin"), providerController.getAllProvider);
        app.get("/provider/:id", verifyToken, checkPermission("admin"), providerController.getProvider);
        app.post("/provider", verifyToken, checkPermission("admin"), providerController.createProvider);
        app.patch("/provider/:id", verifyToken, checkPermission("admin"), providerController.updateProvider);
        app.delete("/provider/:id", verifyToken, checkPermission("admin"), providerController.deleteProvider);
        // ingredient
        app.get("/ingredient", verifyToken, checkPermission("admin"), ingredientController.getAllIngredient);
        app.get("/ingredient/:id", verifyToken, checkPermission("admin"), ingredientController.getIngredient);
        app.post("/ingredient", verifyToken, checkPermission("admin"), ingredientController.createIngredient);
        app.patch("/ingredient/:id", verifyToken, checkPermission("admin"), ingredientController.updateIngredient);
        app.delete("/ingredient/:id", verifyToken, checkPermission("admin"), ingredientController.deleteIngredient);

    });
}

module.exports = routes;
