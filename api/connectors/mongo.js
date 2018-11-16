const mongoose = require('mongoose');

const dbUser = 'instance';
const dbPassword = 'instance';
const dbName = 'navy';

const mongoUri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0-iiekw.mongodb.net?retryWrites=true`;
//const mongoUri = 'mongodb://localhost/database';

mongoose.connect(
  mongoUri,
  {
    reconnectTries: 50,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName,
  },
);
//mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error:'));
db.once('open', () => {
  console.log(`mongoDB connection success: ${mongoUri}`);
});
