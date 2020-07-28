const database = require("../Database/database");

const searchWorkshops = async (req, res) => {
    
    // let categories
    // let categoriesQuery
    // if(!req.body.categories.length){
    //     categories = categoriesList
    //     categoriesQuery = 
    // }
    console.log(req.body)
    let categories = req.body.categories.map( category => `createdWorkshops.category = ${category}`)
    let categoriesQuery = categories.join('OR')
    
    // let searchQuery
    // if(!req.body.search){
    //     searchQuery = 'e'
    // }

    try {
        let search = await database.any(
        `SELECT * FROM createdworkshops JOIN workshopskills ON createdworkshops.id = workshopskills.workshop_id WHERE ${categoriesQuery} AND 
        WHERE createdworkshops.title LIKE %$1% AND WHERE createdWorkshops.description LIKE %${1}% AND WHERE workshopskills.skills LIKE %$1% AND
        WHERE createdworkshops.start_time >= $2 AND createdworkshops.date <= $3 ORDER BY createdworkshops.start_time DESC`,
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