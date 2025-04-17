/**
 * Deletes a driver from the database.
 * @param {*} objRepo 
 * @returns 
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        return res.locals.driver.deleteOne().then(() => {
            return res.redirect('/team/' + res.locals.driver._assignedTo);
        }).catch((err) => {
            return next(err);
        });
    };
};