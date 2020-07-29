const database = require("../Database/database");

const searchWorkshops = async (req, res) => {
    
    // let categories
    // let categoriesQuery
    // if(!req.body.categories.length){
    //     categories = categoriesList
    //     categoriesQuery = 
    // }
    let categories = req.body.categories.map( category => `created_workshops.category = ${category}`)
    let categoriesQuery = categories.join('OR')
    
    // let searchQuery
    // if(!req.body.search){
    //     searchQuery = 'e'
    // }

    try {
        let search = await database.any(
        `SELECT * FROM created_workshops JOIN workshop_skills ON created_workshops.id = workshop_skills.workshop_id WHERE (${categoriesQuery}) AND 
        (created_workshops.title LIKE '%$1%' OR created_workshops.descriptions LIKE '%$1%' OR workshop_skills.skills LIKE '%$1%') AND
        (created_workshops.start_time >= $2 AND created_workshops.date <= $3) ORDER BY created_workshops.start_time DESC`,
        [req.body.search, req.body.dateRange[0].startDate, req.body.dateRange[0].endDate]
        );
        res.status(200).json({
            status: "Success",
            message: "Workshops Found",
            payload: search
        });
    } catch (error) {
        res.status(404).json({
            status: error,
            message: "No Workshops Found",
            payload: null
        });
    }
};

module.exports = { searchWorkshops }