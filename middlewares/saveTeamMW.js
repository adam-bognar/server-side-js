/**
 * Saves or updates team data.
 * @param {*} objRepo 
 * @returns 
 */
module.exports = (objRepo) => {
    return (req, res, next) => {

        console.log(req.body.teamName);
        
        return res.redirect('/');
    };
};