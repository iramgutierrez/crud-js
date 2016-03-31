import Base from 'repositories/BaseRepository'
import Entity from 'entities/ProductEntity'
import Q from 'q'


class ProductRepository extends Base
{
    constructor(Entity)
    {

        super(Entity)

    }
}

export default new ProductRepository(Entity)