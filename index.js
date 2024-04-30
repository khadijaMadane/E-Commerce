const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin:0000@cluster0.dqmsqyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = "Ecomercedb"; // Assurez-vous de mettre le bon nom de base de données ici

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connectez-vous au serveur MongoDB
    await client.connect();

    // Sélectionnez la base de données
    const database = client.db(DATABASE_NAME);

    // Envoyez un ping pour confirmer une connexion réussie
    await database.command({ ping: 1 });
    console.log(`Vous êtes connecté à la base de données ${DATABASE_NAME} avec succès!`);
  } finally {
    // Assurez-vous de fermer la connexion une fois que vous avez terminé
    await client.close();
  }
}

// Exécutez la fonction run pour démarrer la connexion
run().catch(console.dir);

async function testMongoDB() {
  try {
    const database = client.db(DATABASE_NAME);
    const collection = database.collection('produit');

    // Récupérer tous les documents dans la collection
    const documents = await collection.find({}).toArray();
    console.log('Documents récupérés avec succès :', documents);

    // Insérer un nouveau document dans la collection
    const result = await collection.insertOne({ name: 'Jokkn', age: 90 });
    console.log('Nouveau document inséré avec succès :', result.insertedId);
  } catch (error) {
    console.error('Erreur lors du test de MongoDB :', error);
  } finally {
    // Assurez-vous de fermer la connexion une fois que vous avez terminé
    await client.close();
  }
}

// Exécutez la fonction de test
testMongoDB().catch(console.dir);
