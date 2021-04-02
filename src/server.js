import { createServer, Model, hasMany, belongsTo } from 'miragejs'

createServer({
  models: {
    movie: Model.extend({
      actors: hasMany(),
    }),
    actor: Model.extend({
      movie: belongsTo(),
    }),
  },
  seeds(server) {
    const matt = server.create('actor', { name: 'Matthew McConaughey' })
    const anne = server.create('actor', { name: 'Anne Hathaway' })
    const leo = server.create('actor', { name: 'Leonardo Dicarpio' })
    const tom = server.create('actor', { name: 'Tom Hardy' })
    const cillian = server.create('actor', { name: 'Cillian Muphry' })

    server.create('movie', {
      name: 'Inception',
      year: 2010,
      actors: [leo, tom],
    })
    server.create('movie', {
      name: 'Interstellar',
      year: 2014,
      actors: [matt, anne],
    })
    server.create('movie', {
      name: 'Dunkirk',
      year: 2017,
      actors: [cillian, tom],
    })
  },
  routes() {
    this.namespace = 'api'

    this.post('/movies', (schema, request) => {
      let attrs = JSON.parse(request.requestBody)

      return schema.movies.create(attrs)
    })

    this.patch('/movies/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody)
      let id = request.params.id
      let movie = schema.movies.find(id)

      return movie.update(newAttrs)
    })

    this.get('/movies')
    this.get('/movies/:id')
    this.del('/movies/:id')

    this.get('/movies/:id/actors', (schema, request) => {
      let movie = schema.movies.find(request.params.id)

      return movie.actors
    })
  },
})
