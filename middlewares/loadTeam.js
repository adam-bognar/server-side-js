/**
 * Loads team data from the database.
 * @param {*} objRepo 
 * @returns 
 */

module.exports = (objRepo) => {
    return (req, res, next) => {
        res.locals.team = objRepo.F1DB.find((team) => team._id == req.params.id);

        if (typeof res.locals.team === 'undefined') {
            return res.redirect('/');
        }

        return next();
    };
};
