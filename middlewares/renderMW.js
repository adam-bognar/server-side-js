/**
 * Renders the specified HTML page.
 * @param {*} objRepo
 * @param {string} view - The view to render
 * @returns 
 */
module.exports = (objRepo, view) => {
    return (req, res, next) => {
        
        res.render(view, {
            ...res.locals
        });
    };
};