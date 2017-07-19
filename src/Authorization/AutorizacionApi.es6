// @flow
import Request from "../util/Request";

export default class AutorizacionApi extends Request {

    constructor() {

        super();

    }

    validar = async (email: string) => {

        try {
            let response = await this.fetch({
                    "url": "cxf/seguridad/autorizacion/consultarUsuarioEmail",
                    "baseUrl": "http://10.1.44.86:8182/",
                    "data": {
                        email
                    }
                }),
                username = response.claveUsuario;

            if (response === null) {

                throw new Error("El correo no es válido");

            }
            response = await this.fetch({
                "url": "cxf/empleados/rest/buscarActivos",
                "data": {
                    "usuario": username
                }
            });

            if (response.length === 0) {

                throw new Error("El usuario no está activo");

            }
            response = await this.fetch({
                "url": "cxf/seguridad/autorizacion/consultarUsuarios",
                "data": {
                    "claveUsuario": username,
                    "facultades": [{}],
                    "perfiles": [{}]
                }
            });

            if (response.length === 0) {

                throw new Error("No hay facultades y perfiles para este usuario");

            }

            return {
                "perfiles": response[0].perfiles,
                "facultades": response[0].facultades
            };

        } catch (err) {

            throw new Error(err);

        }

    }

}
