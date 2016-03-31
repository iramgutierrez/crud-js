import Q from 'q'

export default class BaseManager
{
    constructor(Entity)
    {
        this.Entity = Entity
        this.entity = Entity

    }
    save(data)
    {
        var deferred = Q.defer()

        this.entity = new this.Entity(data);

        this.entity.save()
            .then(
                resource => deferred.resolve(resource),
                err => deferred.reject(this.generateErrors(err))
            )

        return deferred.promise

    }
    update(data)
    {
        var deferred = Q.defer()

        this.entity.name = data.name || this.entity.name
        this.entity.price = data.price || this.entity.price

        this.entity.save()
          .then(
              resource => deferred.resolve(resource),
              err => deferred.reject(this.generateErrors(err))
          )

        return deferred.promise
    }
    delete()
    {
      var deferred = Q.defer()

      this.entity.remove()
        .then(
            resource => deferred.resolve(true),
            err => deferred.reject(this.generateErrors(err))
        )

      return deferred.promise

    }
    setEntity(Entity)
    {
        this.entity = Entity
    }
    generateErrors(err)
    {
        if(!err.hasOwnProperty('errors'))
        {
          if(err.hasOwnProperty('message'))
          {
            return err.message
          }

          return err
        }

        err = err.errors

        let errors = {}

        Object.keys(err).forEach(function (e) {
          let error = err[e];
          errors[e] = error.message
        })

        return errors
    }
}
