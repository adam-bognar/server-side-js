const loadTeamsMW = require('../middlewares/loadTeams');
const renderMW = require('../middlewares/renderMW');
const saveTeamMW = require('../middlewares/saveTeamMW');
const deleteTeamMW = require('../middlewares/deleteTeamMW');
const loadDriversMW = require('../middlewares/loadDriversMW');
const saveDriverMW = require('../middlewares/saveDriverMW');
const deleteDriverMW = require('../middlewares/deleteDriverMW');


function subscribeToRoutes(app){
    const objRepo = {};
    
    app.get('/', loadTeamsMW(objRepo), renderMW(objRepo,'index'));
    app.get('/team/add/:id', loadTeamsMW(objRepo), renderMW(objRepo,'add'));
    app.post('/team/add/:id', renderMW(objRepo,'add'), saveTeamMW(objRepo));
    app.get('/deleteTeam/:id', deleteTeamMW(objRepo));

    app.get('/team/:Id', loadDriversMW(objRepo), renderMW(objRepo,'drivers'));
    app.get('/driver/add/:id', loadDriversMW(objRepo), renderMW(objRepo,'add'));
    app.post('/driver/add/:id', renderMW(objRepo,'add'), saveDriverMW(objRepo));
    app.get('/driver/delete/:id', deleteDriverMW(objRepo));
}

module.exports = subscribeToRoutes;