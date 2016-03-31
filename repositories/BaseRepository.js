import Q from 'q'

export default class BaseRepository
{
    constructor(Entity)
    {
        this.entity = Entity
    }

    all()
    {
        var deferred = Q.defer()

        this.entity.find({})
            .then(
                resources => deferred.resolve(resources),
                err => deferred.reject(err)
            )

        return deferred.promise
  }
  findById(id)
  {
      var deferred = Q.defer()

      this.entity.findById(id)
          .then(
              resource => {
                if(resource instanceof this.entity){
                  deferred.resolve(resource)
                }
                deferred.reject(resource)
              },
              err => deferred.reject(err)
          )

      return deferred.promise
  }
}
