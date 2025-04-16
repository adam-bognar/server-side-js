/**
 * Loads team data from the database.
 * @param {*} objRepo 
 * @returns 
 */

module.exports = (objRepo) => {
    return (req, res, next) => {
        res.locals.teams = objRepo.F1DB;
        return next();
    };
};
