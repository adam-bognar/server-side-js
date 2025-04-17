/**
 * Loads driver data for a specific team.
 * @param {*} objRepo 
 * @returns 
 */
module.exports = (objRepo) => {

    const DriverModel = objRepo.DriverDB;

    return (req, res, next) => {

        return DriverModel.find({ _assignedTo: req.params.id }).then((drivers) => {
            res.locals.drivers = drivers;
            return next();
        }).catch((err) => {
            return next(err);
        });
    };
};