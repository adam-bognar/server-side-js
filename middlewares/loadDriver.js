/**
 * Loads team data from the database.
 * @param {*} objRepo 
 * @returns 
 */

module.exports = (objRepo) => {

    const DriverModel = objRepo.DriverDB;

    return (req, res, next) => {

        return DriverModel.findOne({ _id: req.params.id }).then((driver) => {
            res.locals.driver = driver;
            return next();
        }).catch((err) => {

            if(driver === null) {
                return res.redirect('/');
            }

            return next(err);
        });

    };
};
