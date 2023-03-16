import express from "express"
import userRoutes from "./routes/userRoutes.js"
import db from "./config/db.js"

// Create the app
const app = express()

// Enable read from forms
app.use(express.urlencoded({ extended:true }))

// Conection to DB
try {
    await db.authenticate()
    db.sync()
    console.log('Conection successful to DB');
} catch (e) {
    console.log(e);
}

// Enable pug
app.set('view engine', 'pug')
app.set('views', './views')

// Public folder
app.use(express.static('public'))

// Routing
app.use('/auth', userRoutes)

const port = 3000

app.listen(port, () => {
    console.log(`listening in port ${port}`);
})