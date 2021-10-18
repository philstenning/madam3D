import Fastify from 'fastify'
import fastifyCors from 'fastify-cors'

const app = Fastify()

const PORT = 3001

// app.register(fastifyCors, {
//   origin: (origin, cb) => {
//     // console.log("origin:", origin);
//     if (/localhost/.test(origin)) {
//       //  Request from localhost will pass
//       cb(null, true);
//       return;
//     }
//     if (!origin) {
//       //  Request from localhost will pass
//       cb(null, true);
//       return;
//     }
//     // Generate an error on other origins, disabling access
//     cb(new Error("Not allowed"), false);
//   },
// });


async function startApp(){

    app.get('/', async (request,reply)=>{
      return {hello:'world'}
    })

    try {
        
        await app.listen(PORT)
        console.log(`🚀 Server ready at http://localhost:${PORT}`)
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}

startApp()