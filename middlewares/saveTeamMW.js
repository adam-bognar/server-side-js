/**
 * Saves or updates team data.
 * @param {*} objRepo 
 * @returns 
 */
module.exports = (objRepo) => {
    const TeamModel = objRepo.TeamDB;


    return (req, res, next) => {
        let newTeam = new TeamModel();

        if (typeof res.locals.team !== 'undefined') {
            newTeam = res.locals.team;
        }

        newTeam.name = req.body.teamName;
        newTeam.principal = req.body.teamPrincipal;
        newTeam.championships = parseInt(req.body.championships) ||0;

        return newTeam.save().then(() => {
            console.log('Team saved successfully!');
            return res.redirect('/');
        }
        ).catch((err) => {
            return next(err);
        });

    };
};