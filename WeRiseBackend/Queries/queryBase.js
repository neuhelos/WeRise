const queryColumns = `
    created_workshops.id AS workshop_id,
    created_workshops.user_id,
    created_workshops.title,
    created_workshops.descriptions,
    created_workshops.start_time,
    created_workshops.end_time,
    created_workshops.category,
    created_workshops.participants,
    created_workshops.workshop_img,
    users.id AS user_id,
    users.firstn,
    users.lastn,
    users.email,
    users.user_pic,
    (SELECT COUNT(workshop_id) FROM registered_workshops WHERE created_workshops.id = registered_workshops.workshop_id) AS workshop_count
  `

module.exports = {queryColumns}