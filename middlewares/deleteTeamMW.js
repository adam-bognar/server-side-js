/**
 * Deletes a team from the database.
 * @param {*} objRepo 
 * @returns 
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        return res.locals.team.deleteOne().then(() => {
            return res.redirect('/');
        }).catch((err) => {
            return next(err);
        });
    };
};