const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Importez vos routes
const authRouter = require("./routers/authRoute");
const productRouter = require("./routers/productRoute");
const blogRouter = require("./routers/blogRoute");
const categoryRouter = require("./routers/prodcategoryRoute");
const blogCatRouter = require("./routers/blogCatRoute");
const brandRouter = require("./routers/brandRoute");
const colorRouter = require("./routers/colorRoute");
const couponRouter = require("./routers/couponRoute");
const enqRouter = require("./routers/enqRoute");

const morgan = require("morgan");
dbConnect();
// Ajustez le chemin pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, '..', 'tdrib', 'front', 'public')));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Utilisation des routes API
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogCatRouter);
app.use("/api/color", colorRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/enquiry", enqRouter);

// Route de déconnexion
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Déconnexion réussie" });
});

// Rediriger toutes les autres requêtes vers index.html pour que React Router puisse gérer la navigation
app.get('*', (req, res) => {
    // Utilisez le chemin correct vers index.html
    res.sendFile(path.join(__dirname, '..', 'tdrib', 'front', 'public', 'index.html'));
});

// Middleware pour gérer les erreurs 404 et autres erreurs API
app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
