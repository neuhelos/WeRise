const database = require("../Database/database");

const searchWorkshops = async (req, res) => {
    
    let categoriesArray = req.body.categories.split(" OR ");
    let categories = categoriesArray.map((category) => `created_workshops.category = '${category}'`)
    let categoriesQuery = categories.join(" OR ");

    if(req.body.search && req.body.categories && req.body.endDate){
        try {
            let search = await database.any(
            `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
            JOIN users ON created_workshops.user_id = users.id
            WHERE ($1) AND (created_workshops.title ILIKE $2 OR created_workshops.descriptions ILIKE $2
            OR workshop_skills.skills ILIKE $2) AND
            (created_workshops.start_time >= $3 AND created_workshops.end_time <= $4) 
            ORDER BY created_workshops.start_time`,
            [categoriesQuery, `%${req.body.search}%`, req.body.startDate, req.body.endDate]
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

    if(!req.body.categories && !req.body.search && req.body.endDate){ //DateRange Only
        try {
            let search = await database.any(
            `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
            JOIN users ON created_workshops.user_id = users.id
            WHERE created_workshops.start_time >= $1 AND created_workshops.end_time <= $2
            ORDER BY created_workshops.start_time`
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
    
    if(!req.body.search && req.body.endDate && req.body.categories){ //DateRange & Categories
        try {
            let search = await database.any(
            `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
            JOIN users ON created_workshops.user_id = users.id
            WHERE ($1) AND created_workshops.start_time >= $2 AND created_workshops.end_time <= $3) 
            ORDER BY created_workshops.start_time`,
            [categoriesQuery, req.body.startDate, req.body.endDate]
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

    if(!req.body.endDate && !req.body.categories && req.body.search){ //Search Only
        try{
            let search = await database.any(
            `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
            JOIN users ON created_workshops.user_id = users.id
            WHERE created_workshops.title ILIKE $1 OR created_workshops.descriptions ILIKE $1
            OR workshop_skills.skills ILIKE $1
            ORDER BY created_workshops.start_time`,
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

    if(!req.body.search && !req.body.endDate && req.body.categories){ //Categories Only
        try {
            let search = await database.any(
            `SELECT * FROM created_workshops LEFT JOIN users ON created_workshops.user_id = users.id WHERE $1
            ORDER BY created_workshops.start_time`,
            [categoriesQuery]
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
