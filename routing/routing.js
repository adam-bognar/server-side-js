const loadTeamsMW = require('../middlewares/loadTeams');
const renderMW = require('../middlewares/renderMW');
const saveTeamMW = require('../middlewares/saveTeamMW');
const deleteTeamMW = require('../middlewares/deleteTeamMW');
const loadDriversMW = require('../middlewares/loadDriversMW');
const saveDriverMW = require('../middlewares/saveDriverMW');
const deleteDriverMW = require('../middlewares/deleteDriverMW');
const loadTeamMW = require('../middlewares/loadTeam');


function subscribeToRoutes(app) {
    const objRepo = {
        F1DB: [
            {
                _id: 1,
                name: 'Ferrari',
                principal: 'Fred Vasseur',
                championships: 16
            },
            {
                _id: 2,
                name: 'Mercedes',
                principal: 'Toto Wolff',
                championships: 8
            },
            {
                _id: 3,
                name: 'McLaren',
                principal: 'Andrea Stella',
                championships: 9
            }
        ]
    };

    app.get('/', loadTeamsMW(objRepo), renderMW(objRepo, 'index'));

    app.get('/team/add/:id',
        (req, res, next) => {
            res.locals.heading = 'Csapat szerkesztése';
            res.locals.type = 'team';
            return next();
        },
        loadTeamMW(objRepo),
        renderMW(objRepo, 'add')
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
            return next();
        },
        renderMW(objRepo, 'add')
    );

    // Save new team (POST form)
    app.post('/team/add',
        (req, res, next) => {
            res.locals.heading = 'Csapat hozzáadása';
            res.locals.type = 'team';
            return next();
        },
        saveTeamMW(objRepo)
    );
    app.get('/deleteTeam/:id', deleteTeamMW(objRepo));

    app.get('/team/:Id', loadDriversMW(objRepo), renderMW(objRepo, 'drivers'));
    app.get('/driver/add/:id',
        (req, res, next) => {
            res.locals.heading = 'Versenyző szerkesztése';
            res.locals.type = 'driver';
            return next();
        },
        loadDriversMW(objRepo),
        renderMW(objRepo, 'add')
    );
    app.post('/driver/add/:id', (req, res, next) => { res.locals.heading = "Versenyző szerkesztése"; return next(); }, renderMW(objRepo, 'add'), saveDriverMW(objRepo));
    app.get('/driver/delete/:id', deleteDriverMW(objRepo));
}

module.exports = subscribeToRoutes;