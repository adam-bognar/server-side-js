/**
 * Loads team data from the database.
 * @param {*} objRepo 
 * @returns 
 */

module.exports = (objRepo) => {

    const TeamModel = objRepo.TeamDB;

    return (req, res, next) => {

        return TeamModel.find({}).then((teams) => {
            res.locals.teams = teams;
            return next();
        }).catch((err) => {
            return next(err);
        }
        );
    };
};
