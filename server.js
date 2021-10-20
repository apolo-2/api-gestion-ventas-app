import express from 'express';
import dotenv from 'dotenv';
import Cors from 'cors';
import { connectServer } from './db/db.js';
import rutasProducto from './views/producto/routes.js';
import rutasUsuario from './views/usuarios/routes.js';
// import rutasVenta from './views/sale/routes.js';
import autorizacionEstadoUsuario from './middleware/autorizacionEstadoUsuario.js';
import jwt  from 'express-jwt';
import jwks  from 'jwks-rsa';

dotenv.config({ path: './.env' });
const app = express();

const port = process.env.PORT || 5000

//validacion de token
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://misiontic-apolo2-appventas.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-auth-apolo2-ventas-app',
issuer: 'https://misiontic-apolo2-appventas.us.auth0.com/',
algorithms: ['RS256']
});

app.use(express.json());
app.use(Cors());
app.use(jwtCheck);//Middle para validar el token, genera error 401 no autorizado si el token no es valido.
app.use(autorizacionEstadoUsuario); //Para la validacion del estado del usuario.
app.use(rutasProducto);
app.use(rutasUsuario);
// app.use(rutasVenta);

const main = () => {
  return app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

connectServer(main);