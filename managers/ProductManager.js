import Base from 'managers/BaseManager'
import Entity from 'entities/ProductEntity'

class ProductManager extends Base
{
    constructor(Entity)
    {
        super(Entity)
    }

}

export default new ProductManager(Entity)
