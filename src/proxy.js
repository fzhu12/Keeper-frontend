const { proxy } = require("http-proxy-middleware");

module.exports = app => {
    app.use("/api",
        proxy({
            target: "https://keeper-prj-backend-fc62b2193cf6.herokuapp.com/",
            changeOrigin: true
        }))
};