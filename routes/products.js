import express from 'express'
import controller from 'controllers/ProductController'
import resource from 'routes/Resource'

var router = express.Router()

router = resource.create(router , controller)

export default router;
