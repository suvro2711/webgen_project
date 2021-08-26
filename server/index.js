import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import moment from 'moment';
import fileUpload from 'express-fileupload';
import path from 'path'
import jwt from 'jsonwebtoken'

const __dirname = path.resolve();
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'images')))
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Flight2711####',
    database: 'webgen'
})

app.post("/register", (req, res) => {
    const { email, password } = req.body
    const fileName_differentiator = moment.now()
    const token = jwt.sign({ email }, 'Shubhro');
    const query = 'INSERT INTO users ( email, password) VALUES (?,?) '
    db.query(query,
        [email, password],
        (error, result) => {
            if (error) {
                console.log(error.sqlMessage)
                res.status(400).send(error.sqlMessage)
            } else {
                const queryForToken = 'UPDATE users SET AccessToken=? WHERE id=? '
                db.query(queryForToken, [token, result.insertId])
                let fileName
                if (req.files) {
                    const file = req.files.image
                    fileName = `${__dirname}/images/${fileName_differentiator}-${file.name}`
                    file.mv(fileName, (err) => {
                        console.log(err)
                        res.status(500).send(err)
                    })
                    const queryForImage = 'UPDATE users SET imageLink=? WHERE id=? '
                    db.query(queryForImage, [`http://localhost:3001/${fileName_differentiator}-${file.name}`, result.insertId])
                    res.send({
                        AccessToken: token,
                        image: `http://localhost:3001/${fileName_differentiator}-${file.name}`,
                        email
                    })
                    return
                }
                res.send({
                    AccessToken: token,
                    email
                })
            }
        }
    )
})

app.post("/login", (req, res) => {
    const { email, password } = req.body
    const token = jwt.sign({ email }, 'Shubhro');
    const query = 'SELECT * FROM users WHERE email=? AND password =? '
    db.query(query,
        [email, password],
        (error, result) => {
            if (error) {
                console.log('error', error)
                res.status(404).send({ error, email })
            } else {
                console.log('result:', result)
                if (!(result[0].password === password)) {
                    res.status(404).send('wrong password!')
                    return
                }
                const addTokenQuery = 'UPDATE users SET AccessToken=? WHERE email=? '
                db.query(addTokenQuery, [token, email], (errorToken, resultToken) => {
                    if (error) {
                        console.log('error adding token:', errorToken)
                    } else {
                        res.send({ ...result[0], AccessToken: token })
                    }

                }
                )

            }
        }
    )
})

app.get("/products", (req, res) => {
    const query = 'SELECT * from products '
    db.query(query,
        (error, result) => {
            if (error) {
                res.send({ error })
            } else {
                res.send({ products: result })
            }
        }
    )
})

app.post("/delete_product", (req, res) => {
    const { id, name, price, description } = req.body
    console.log('delete_product:', req.body)
    const query = 'DELETE FROM products WHERE id=? '
    db.query(query,
        [id],
        (error, result) => {
            if (error) {
                res.send({ error, id })
            } else {
                res.send({ id, name, price, description })
            }
        }
    )
})

app.post("/update_product", (req, res) => {
    const { id, name, price, description, add_by_user, imageLink } = req.body
    console.log('update_product:', req.body)
    const query = 'UPDATE products SET name=?, price=?, description=?, updated_at=? WHERE ( id=? )'
    const updated_at = moment().format('LLL')
    const fileName_differentiator = moment.now()
    console.log(query)
    db.query(query,
        [name, price, description, updated_at, id],
        (error, result) => {
            if (error) {
                console.log('initial error:', error)
                res.send({ error, id })
            } else {
                console.log(result)
                let fileName
                if (req.files) {
                    const file = req.files.image
                    fileName = `${__dirname}/images/${fileName_differentiator}-${file.name}`
                    console.log('Got File:', fileName)
                    file.mv(fileName, (err) => {
                        console.log('err', err)
                        res.status(500).send(err)
                    })
                    const queryForImage = 'UPDATE products SET imageLink=? WHERE id=? '
                    console.log(`http://localhost:3001/${fileName_differentiator}-${file.name}`)
                    db.query(queryForImage,
                        [`http://localhost:3001/${fileName_differentiator}-${file.name}`,
                            id], (error, result) => {
                                console.log('result:', result, 'error', error)

                            })
                    console.log(`http://localhost:3001/${fileName_differentiator}-${file.name}`)
                    res.send({
                        product: {
                            name,
                            price,
                            description,
                            id,
                            imageLink: `http://localhost:3001/${fileName_differentiator}-${file.name}`,
                            updated_at,
                            add_by_user
                        }
                    })
                    return
                }
                res.send({
                    product: {
                        name,
                        price,
                        description,
                        id,
                        imageLink,
                        updated_at,
                        add_by_user
                    }
                })
            }
        }
    )
})

app.post("/products", (req, res) => {
    const { name, price, description, add_by_user } = req.body
    console.log({ name, price, description, add_by_user })
    const timeNow = moment().format('LLL')
    const fileName_differentiator = moment.now()
    const query = 'INSERT INTO products (name, price, description, created_at, add_by_user) VALUES (?,?,?,?,?)'
    db.query(query,
        [name, price, description, timeNow, add_by_user],
        (error, result) => {
            if (error) {
                res.send({ error })
            } else {
                console.log(result)
                let fileName
                if (req.files) {
                    const file = req.files.image
                    fileName = `${__dirname}/images/${fileName_differentiator}-${file.name}`
                    file.mv(fileName, (err) => {
                        res.status(500).send(err)
                    })
                    const queryForImage = 'UPDATE products SET imageLink=? WHERE id=? '
                    db.query(queryForImage, [`http://localhost:3001/${fileName_differentiator}-${file.name}`, result.insertId])
                    res.send({
                        product: {
                            name,
                            price,
                            description,
                            id: result.insertId,
                            imageLink: `http://localhost:3001/${fileName_differentiator}-${file.name}`,
                            created_at: timeNow
                        }
                    })
                    return
                }
                res.send({
                    product: {
                        name,
                        price,
                        description,
                        id: result.insertId,
                        created_at: timeNow
                    }
                })
            }
        }
    )
})
app.post('/access', (req, res) => {
    const { AccessToken, email } = req.body
    console.log('access request', req.body)
    const query = 'SELECT * from users WHERE email=?'
    db.query(query, [email], (error, result) => {
        if (error) {
            console.log('access request error:', error)
            res.status(500).send(error)
        } else {
            if (AccessToken === result[0].AccessToken) {
                res.send(result[0])
            } else {
                console.log('reciewved:', AccessToken, 'got:', result[0].AccessToken)
                res.status(500).send(error)
            }
        }
    })
})
app.listen(3001, () => {
    console.log('Server ready')
})
