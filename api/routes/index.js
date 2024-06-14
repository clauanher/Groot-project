//ROUTER PRINCIPAL. Todas las peticiones que empiecen por '/api' serán redirigidas a este router (línea 23 del archivo index.js principal), donde comprobaremos a qué endpoint debería ir dirigido.

const router = require('express').Router() // Creo una instancia de router de express para definir las posibles rutas a emplear

const userRouter = require('./users.routes')
const starRouter = require('./stars.routes')
const constellationRouter = require('./constellations.routes')
const authRouter = require('./auth.routes')

// Según la siguiente parte del endpoint (/api/user, o /api/joke, etc.), dirigimos la petición a su router correspondiente
router.use('/user', userRouter)
router.use('/star', starRouter)
router.use('/constellation', constellationRouter)
router.use('/auth', authRouter)

module.exports = router // Exporto la instancia de este router para poder importarlo en el index.js principal