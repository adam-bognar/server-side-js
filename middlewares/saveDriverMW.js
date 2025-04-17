/**
 * Saves or updates driver data.
 * @param {*} objRepo 
 * @returns 
 */
module.exports = (objRepo) => {
    const DriverModel = objRepo.DriverDB;

    return (req, res, next) => {
        let driver = new DriverModel();

        if (res.locals.driver && typeof res.locals.driver.save === 'function') {
            driver = res.locals.driver;
        }

        driver.name = req.body.name;
        driver.role = req.body.role;
        driver.wins = parseInt(req.body.wins) || 0;

        if (res.locals.teamId) {
            driver._assignedTo = res.locals.teamId;
        }

        return driver.save().then(() => {
            console.log('Driver saved successfully!');
            return res.redirect('/team/' + driver._assignedTo);
        }).catch((err) => {
            return next(err);
        });
    };
};
