const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs')
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY
})
router.post('/upload', auth, authAdmin, async (req, res) => {
    try {
        // console.log(req.files);

        // Vérifier s'il y a des fichiers téléversés
        if (!req.files || !req.files.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        // Récupérer le fichier téléversé
        const file = req.files.file;

        // Vérifier la taille du fichier
        if (file.size > 1024 * 1024) {
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: 'File size is too large' });
        }

        // Vérifier le type MIME du fichier
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: 'File format is incorrect' });
        }

        // Téléverser le fichier vers Cloudinary
        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'test' }, async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'Error uploading file to Cloudinary' });
            }
            removeTemp(file.tempFilePath)
            // Retourner le résultat de Cloudinary
            res.json({public_id: result.public_id, url:result.secure_url });
        });
    } catch (err) {
        // Gérer les erreurs
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});
router.post('/destroy', auth, authAdmin, (req,res)=>{
    try {
      const {public_id} =req.body;
      if(!public_id){      
        return res.status(400).json({msg: "No image selected"})
      } 
      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Error uploading file to Cloudinary' });
        }
        res.json({msg: 'Deleted image successfully'})
    }) 
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
      
    }
})
const removeTemp = (path) =>{
    fs.unlink(path,err =>{
        if(err) throw err;
    })
}
module.exports=router;