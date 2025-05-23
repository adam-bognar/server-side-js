/**
 * Loads team data from the database.
 * @param {*} objRepo 
 * @returns 
 */

module.exports = (objRepo) => {

    const TeamModel = objRepo.TeamDB;

    return (req, res, next) => {

        return TeamModel.findOne({ _id: req.params.id }).then((team) => {
            if (!team) {
                return res.redirect('/');
            }
            res.locals.team = team;
            return next();
        }).catch((err) => {

            if(team === null) {
                return res.redirect('/');
            }

            return next(err);
        });

    };
};
