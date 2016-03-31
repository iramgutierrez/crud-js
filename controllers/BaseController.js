import Q from 'q'

export default class BaseController
{
    constructor(Repository , Manager)
    {

        this.repository = Repository
        this.manager = Manager
    }

    index(req , res)
    {
        var deferred = Q.defer()

        this.repository.all()
            .then(
                resources => deferred.resolve(res.status(200).json(resources)),
                err => deferred.reject(res.status(500).json({ errors : err}))
            )

        return deferred.promise

    }

    store(req , res)
    {
        var deferred = Q.defer()

        if(!req.body) deferred.reject(res.status(400).json({ error : 'Missing data'}))

        let data = req.body

        this.manager.save(data)
            .then(
                resource => deferred.resolve(res.status(200).json(resource)),
                err => deferred.reject(res.status(400).json(this.generateErrors(err)))
            )

        return deferred.promise
    }

    show(req , res)
    {
        var deferred = Q.defer()

        let id = req.params.id || false

        if(!id) deferred.reject(res.status(400).json({ error : 'Missing parameter: id'}))

        this.repository.findById(id)
            .then(
                resource => deferred.resolve(res.status(200).json(resource)),
                err => deferred.reject(res.status(404).json({ error : 'Entity not found'}))
            )

        return deferred.promise

    }

    update(req , res)
    {
        let deferred = Q.defer()

        let id = req.params.id || false

        if(!id) deferred.reject(res.status(400).json({ error : 'Missing parameter: id'}))

        if(!req.body) deferred.reject(res.status(400).json({ error : 'Missing data'}))

        let data = req.body

        this.repository.findById(id)
            .then(
                resource => {
                  this.manager.setEntity(resource)
                  this.manager.update(data)
                      .then(
                          resource => deferred.resolve(res.status(200).json(resource)),
                          err => deferred.reject(res.status(400).json(this.generateErrors(err)))
                      )
                },
                err => deferred.reject(res.status(404).json({ error : 'Entity not found'}))
            )

        return deferred.promise

    }

    delete(req , res)
    {
        let deferred = Q.defer()

        let id = req.params.id || false

        if(!id) deferred.reject(res.status(400).json({ error : 'Missing parameter: id'}))

        this.repository.findById(id)
            .then(
                resource => {
                  this.manager.setEntity(resource)
                  this.manager.delete()
                      .then(
                          resource => deferred.resolve(res.sendStatus(204)),
                          err => deferred.reject(res.status(400).json(this.generateErrors(err)))
                      )
                },
                err => deferred.reject(res.status(404).json({ error : 'Entity not found'}))
            )

        return deferred.promise

    }

    generateErrors(err)
    {
      if(typeof err == 'string')
      {
        return { error : err}
      }
      return { errors : err}
    }
}
