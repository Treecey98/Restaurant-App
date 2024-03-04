const db = require('./config/db');
const cors = require('cors');

const app = express()

const PORT = 3001

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.listen(3001, () => {
    console.log('This is working');
}); */