const loadTeamsMW = require('../middlewares/loadTeams');
const renderMW = require('../middlewares/renderMW');
const saveTeamMW = require('../middlewares/saveTeamMW');
const deleteTeamMW = require('../middlewares/deleteTeamMW');
const loadDriversMW = require('../middlewares/loadDriversMW');
const saveDriverMW = require('../middlewares/saveDriverMW');
const deleteDriverMW = require('../middlewares/deleteDriverMW');
const loadTeamMW = require('../middlewares/loadTeam');
const loadDriverMW = require('../middlewares/loadDriver');


const TeamModel = require('../models/team');
const DriverModel = require('../models/driver');
const loadDriver = require('../middlewares/loadDriver');

function subscribeToRoutes(app) {
    const objRepo = {
        TeamDB: TeamModel,
        DriverDB: DriverModel,
    };

    app.get('/', loadTeamsMW(objRepo), renderMW(objRepo, 'index'));

    app.get('/team/add/:id',
        (req, res, next) => {
            res.locals.heading = 'Csapat szerkesztése';
            res.locals.type = 'team';
            return next();
        },
        loadTeamMW(objRepo),
        renderMW(objRepo, 'addTeam')
    );

    // Update team
    app.post('/team/edit/:id',
        (req, res, next) => {
            res.locals.heading = 'Csapat szerkesztése';
            res.locals.type = 'team';
            return next();
        },
        loadTeamMW(objRepo),
        saveTeamMW(objRepo)
    );

    app.get('/team/add',
        (req, res, next) => {
            res.locals.heading = 'Csapat hozzáadása';
            res.locals.type = 'team';
            res.locals.team = { name: '', principal: '', championships: 0 };
            res.locals.driver = null; 
            return next();
        },
        renderMW(objRepo, 'addTeam')
    );

    // Save new team (POST form)
    app.post('/team/add',
        (req, res, next) => {
            res.locals.heading = 'Csapat hozzáadása';
            res.locals.type = 'team';
            res.locals.driver = null;
            return next();
        },
        saveTeamMW(objRepo)
    );
    app.get('/team/delete/:id', loadTeamMW(objRepo),deleteTeamMW(objRepo));

    app.get('/team/:id', loadTeamMW(objRepo),loadDriversMW(objRepo), renderMW(objRepo, 'drivers'));
    app.get('/driver/edit/:id',
        (req, res, next) => {
            res.locals.heading = 'Versenyző szerkesztése';
            res.locals.type = 'driver';
            return next();
        },
        loadDriverMW(objRepo), 
        (req, res, next) => {
            if (res.locals.driver && res.locals.driver._assignedTo) {
                res.locals.teamId = res.locals.driver._assignedTo.toString();
            }
            return next();
        },
        renderMW(objRepo, 'addDriver')
    );
    

    app.post('/driver/edit/:id',
        (req, res, next) => {
            res.locals.heading = 'Versenyző szerkesztése';
            res.locals.type = 'driver';
            return next();
        },
        loadDriverMW(objRepo),
        saveDriverMW(objRepo)
    );

    app.get('/driver/add/:teamId', 
        (req, res, next) => {
            if (!req.params.teamId) {
                return res.redirect('/error/no-team');
            }
            res.locals.heading = 'Versenyző hozzáadása';
            res.locals.type = 'driver';
            res.locals.driver = { name: '', role: '', wins: 0 };
            res.locals.teamId = req.params.teamId;
            return next();
        },
        renderMW(objRepo, 'addDriver')
    );
    

    app.post('/driver/add/:teamId',
        (req, res, next) => {
            res.locals.heading = 'Versenyző hozzáadása';
            res.locals.type = 'driver';
            res.locals.driver = { name: '', role: '', wins: 0 };
            res.locals.teamId = req.params.teamId;
            return next();
        },
        saveDriverMW(objRepo)
    )

    app.get('/driver/delete/:id', loadDriverMW(objRepo),deleteDriverMW(objRepo));

    app.use((err,req,res,next) =>{
        console.log(err);
        res.end("ajaj")
    })

    
}

module.exports = subscribeToRoutes;