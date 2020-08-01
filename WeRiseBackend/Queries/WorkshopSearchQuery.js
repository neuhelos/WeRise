const database = require("../Database/database");

const searchWorkshops = async (req, res) => {
    
    if(req.body.search && req.body.categories && req.body.startDate){
        try {
            let categoriesArray = req.body.categories.split(" OR ");
            let categories = categoriesArray.map(
                (category) => `created_workshops.category = '${category}' `
            );
            let categoriesQuery = categories.join(" OR ");
            console.log(`%${req.body.search}%`)
    
            let search = await database.any(
            `SELECT * FROM created_workshops JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
            JOIN users ON created_workshops.user_id = users.id
            WHERE (${categoriesQuery}) AND (created_workshops.title LIKE $1 OR created_workshops.descriptions LIKE $1
            OR workshop_skills.skills LIKE $1) AND
            (created_workshops.start_time >= $2 AND created_workshops.end_time <= $3) 
            ORDER BY created_workshops.start_time`,
            [`%${req.body.search}%`, req.body.startDate, req.body.endDate]
            );
            res.status(200).json({
                status: "Success",
                message: "Workshop Search Successful",
                payload: search,
            });
        } catch (error) {
            res.status(404).json({
                status: error,
                message: "No Workshops Found",
                payload: null,
            });
        }
    };

    if(!req.body.categories && !req.body.search){ //DateRange Only
        try {
            let search = await database.any(
            `SELECT * FROM created_workshops JOIN users ON created_workshops.user_id = users.id
            WHERE created_workshops.start_time >= $1 AND created_workshops.end_time <= $2 
            ORDER BY created_workshops.start_time`,
            [req.body.startDate, req.body.endDate]
            );
            res.status(200).json({
                status: "Success",
                message: "Workshop Search Successful",
                payload: search,
            });
        } catch (error) {
            res.status(404).json({
                status: error,
                message: "No Workshops Found",
                payload: null,
            });
        }
    }
    
    if(!req.body.search){ //DateRange & Categories
        try {
            let categoriesArray = req.body.categories.split(" OR ");
            let categories = categoriesArray.map(
                (category) => `created_workshops.category = '${category}' `
            );
            let categoriesQuery = categories.join(" OR ");

            let search = await database.any(
            `SELECT * FROM created_workshops JOIN users ON created_workshops.user_id = users.id
            WHERE (${categoriesQuery}) AND
            (created_workshops.start_time >= $1 AND created_workshops.end_time <= $2) 
            ORDER BY created_workshops.start_time`,
            [req.body.startDate, req.body.endDate]
            );
            res.status(200).json({
                status: "Success",
                message: "Workshop Search Successful",
                payload: search,
            });
        } catch (error) {
            res.status(404).json({
                status: error,
                message: "No Workshops Found",
                payload: null,
            });
        }
    }

    if(!req.body.startDate && !req.body.categories){ //Search Only
        try{
            let search = await database.any(
            `SELECT * FROM created_workshops JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
            JOIN users ON created_workshops.user_id = users.id
            WHERE created_workshops.title LIKE $1 OR created_workshops.descriptions LIKE $1
            OR workshop_skills.skills LIKE $1`,
            [`%${req.body.search}%`]
            );
            res.status(200).json({
                status: "Success",
                message: "Workshop Search Successful",
                payload: search,
            });
        } catch (error) {
            res.status(404).json({
                status: error,
                message: "No Workshops Found",
                payload: null,
            });
        }
    }

    if(!req.body.search && !req.body.startDate){ //Categories Only
        try {
            console.log(req.body)
            let categoriesArray = req.body.categories.split(" OR ");
            let categories = categoriesArray.map(
                (category) => `created_workshops.category = '${category}' `
            );
            let categoriesQuery = categories.join(" OR ");
    
            let search = await database.any(
            `SELECT * FROM created_workshops JOIN users ON created_workshops.user_id = users.id
            WHERE (${categoriesQuery})
            ORDER BY created_workshops.start_time`
            );
            res.status(200).json({
                status: "Success",
                message: "Workshop Search Successful",
                payload: search,
            });
        } catch (error) {
            res.status(404).json({
                status: error,
                message: "No Workshops Found",
                payload: null,
            });
        }
    };

}
    

module.exports = { searchWorkshops };
