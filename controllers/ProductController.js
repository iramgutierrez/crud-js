import Base from 'controllers/BaseController'
import Repository from 'repositories/ProductRepository'
import Manager from 'managers/ProductManager'

class ProductController extends Base
{
    constructor(Repository , Manager)
    {
        super(Repository , Manager)

    }
}

export default new ProductController(Repository , Manager)
