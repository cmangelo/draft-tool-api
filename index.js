const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const playerRouter = require('./src/routers/player.router');

require('./src/db/mongoose');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/players', playerRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});