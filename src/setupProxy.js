const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
    app.use("/api",
        createProxyMiddleware({
            target: "https://keeper-prj-backend-fc62b2193cf6.herokuapp.com/",
            changeOrigin: true
        }))
};