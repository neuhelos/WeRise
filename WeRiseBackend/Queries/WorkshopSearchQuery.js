const database = require("../Database/database");

//const categories = require('../../we-rise/src/features/BaseComponents/WorkshopCategories')


const searchWorkshops = async (req, res) => {
    
    let categoriesArray = req.body.categories.split(" OR ")
    let categoriesQuery = req.body.categories ? categoriesArray.map((category) => `created_workshops.category = '${category}'`).join(" OR ") : `created_workshops.category IS NOT NULL`

    const query = {
        search: req.body.search ? `%${req.body.search}%` : `%e%`,
        endDate: req.body.endDate ? req.body.endDate : new Date(new Date().getFullYear() + 20, 11, 31, 23, 59, 0, 0)
    }
    console.log(query)

    try {
        let search = await database.any(
            `SELECT DISTINCT ON( created_workshops.id ) * 
            FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
            LEFT JOIN registered_workshops ON created_workshops.id = registered_workshops.workshop_id
            JOIN users ON created_workshops.user_id = users.id
            WHERE (${categoriesQuery}) AND (created_workshops.title ILIKE $1 OR created_workshops.descriptions ILIKE $1
            OR workshop_skills.skills ILIKE $1) AND
            (created_workshops.start_time >= $2 AND created_workshops.end_time <= $3) AND
            created_workshops.start_time >= NOW() AND 
            created_workshops.user_id != $4 AND
            ORDER BY created_workshops.id, created_workshops.start_time`,
            [query.search, req.body.startDate, query.endDate, req.body.user_id]
        );
        res.status(200).json({
            status: "Success",
            message: "Workshop Search Successful",
            payload: search,
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status: error,
            message: "No Workshops Found",
            payload: null,
        });
    }
}


//     let search      
//     try {
//         if(req.body.search && req.body.categories && req.body.endDate){ //All
//             search = await database.any(
//                 `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
//                 JOIN users ON created_workshops.user_id = users.id
//                 WHERE (${categoriesQuery}) AND (created_workshops.title ILIKE $1 OR created_workshops.descriptions ILIKE $1
//                 OR workshop_skills.skills ILIKE $1) AND
//                 (created_workshops.start_time >= $2 AND created_workshops.end_time <= $3) 
//                 ORDER BY created_workshops.start_time`,
//                 [`%${req.body.search}%`, req.body.startDate, req.body.endDate]
//             );
//         };
//         if(req.body.search && !req.body.categories && req.body.endDate){ //Search & DateRange
//             search = await database.any(
//                 `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
//                 JOIN users ON created_workshops.user_id = users.id
//                 WHERE (created_workshops.title ILIKE $1 OR created_workshops.descriptions ILIKE $1
//                 OR workshop_skills.skills ILIKE $1) AND
//                 (created_workshops.start_time >= $2 AND created_workshops.end_time <= $3) 
//                 ORDER BY created_workshops.start_time`,
//                 [`%${req.body.search}%`, req.body.startDate, req.body.endDate]
//             );
//         }
//         if(!req.body.search && req.body.endDate && req.body.categories){ //DateRange & Categories
//             search = await database.any(
//                 `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
//                 JOIN users ON created_workshops.user_id = users.id
//                 WHERE (${categoriesQuery}) AND created_workshops.start_time >= $1 AND created_workshops.end_time <= $2) 
//                 ORDER BY created_workshops.start_time`,
//                 [req.body.startDate, req.body.endDate]
//             );
//         }
//         if(req.body.search && req.body.categories && !req.body.endDate){ //Search & Categories
//             search = await database.any(
//                 `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
//                 JOIN users ON created_workshops.user_id = users.id
//                 WHERE (${categoriesQuery}) AND (created_workshops.title ILIKE $1 OR created_workshops.descriptions ILIKE $1
//                 OR workshop_skills.skills ILIKE $1)
//                 ORDER BY created_workshops.start_time`,
//                 [`%${req.body.search}%`]
//             );
//         };
//         if(!req.body.endDate && !req.body.categories && req.body.search){ //Search Only
//             search = await database.any(
//                 `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
//                 JOIN users ON created_workshops.user_id = users.id
//                 WHERE created_workshops.title ILIKE $1 OR created_workshops.descriptions ILIKE $1
//                 OR workshop_skills.skills ILIKE $1
//                 ORDER BY created_workshops.start_time`,
//                 [`%${req.body.search}%`]
//             );
//         }
//         if(!req.body.categories && !req.body.search && req.body.endDate){ //DateRange Only
//             search = await database.any(
//                 `SELECT * FROM created_workshops LEFT JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id
//                 JOIN users ON created_workshops.user_id = users.id
//                 WHERE created_workshops.start_time >= $1 AND created_workshops.end_time <= $2
//                 ORDER BY created_workshops.start_time`,
//                 [req.body.startDate, req.body.endDate]
//             );
//         }
//         if(!req.body.search && !req.body.endDate && req.body.categories){ //Categories Only
//             search = await database.any(
//                 `SELECT * FROM created_workshops LEFT JOIN users ON created_workshops.user_id = users.id WHERE ${categoriesQuery}
//                 ORDER BY created_workshops.start_time`
//             );
//             }
//         res.status(200).json({
//             status: "Success",
//             message: "Workshop Search Successful",
//             payload: search,
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({
//             status: error,
//             message: "No Workshops Found",
//             payload: null,
//         });
//     }

// }
    

module.exports = { searchWorkshops };
