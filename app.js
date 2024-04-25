const express = require('express');

const port = process.env.port ?? 3000
const app = express();

app.use(express.static('web'));

app.get('/', (req, res) => {

});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})