import { validateUniqueResponse, validationResponse } from "@helpers/validationResponse";
import models from "@models"
import Response from "@helpers/Response"
import { validateCreatePensioner } from "@validations/pensioner";

const { Pensioner } = models

class PensionerController {
    static async create(req, res, next) {
        try {
            const pensionerDetails = await validateCreatePensioner(req.body);
            const pensioner = await Pensioner.create(pensionerDetails);

            Response.success(res, 200, pensioner);

        } catch (err) {
            if (err.isJoi && err.name === 'ValidationError') {
                return res.status(400).json({
                    status: 400,
                    errors: validationResponse(err)
                });
            }

            if (err.errors && err.errors[0].type === 'unique violation') {
                return res.status(400).json({
                    status: 400,
                    errors: validateUniqueResponse(err)
                });
            }
            next(err);
        }

    }

    static async getall(req, res, next) {
        try {
            const pensioner = await Pensioner.findAll();
            return Response.success(res, 200, pensioner);

        } catch (error) {
            return Response.error(res, 500, error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { pensionerID } = req.params

            const pensioner = await Pensioner.findOne({ where: { id: pensionerID } });
            if (!pensioner) return Response.error(res, 404, "Pensioner does not exist");
            await pensioner.destroy();

            return Response.success(res, 200, pensioner, "Pensioner has been deleted");
        } catch (error) {
            return Response.error(res, 404, "Pensioner does not exist");
        }
    }
}
export default PensionerController;