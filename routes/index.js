const express = require('express')
const passport = require('passport')

const routes = express.Router()

const { userRegister, userLogin } = require('../controller/auth')

const { addData, getAllData, getAllCategories, deleteTransaction , addCategory} = require('../controller/index')

routes.post('/user/register', userRegister)

routes.post('/user/login', userLogin)

routes.post('/user/transaction', passport.authenticate('jwt', { session: false }), addData)

routes.get('/user/transaction', passport.authenticate('jwt', { session: false }), getAllData)

routes.post('/user/transaction/category', passport.authenticate('jwt', { session: false }), addCategory)

routes.get('/user/transaction/category', passport.authenticate('jwt', { session: false }), getAllCategories)

routes.delete('/user/transaction/category/:id', passport.authenticate('jwt', { session: false }), deleteTransaction)

module.exports = routes