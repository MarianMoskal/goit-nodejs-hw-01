
function idGenerator(ids) {
    let ID = Math.floor(Math.random() * 100);

    ids.forEach(id => {
        if (ID !== id) {
            return
        } else {
            ID = Math.floor(Math.random() * 100 + 100);

            if (ID !== id) {
                return
            } else {
                ID = Math.floor(Math.random() * 100 + 200);
            }
        }
    })

    return ID
}

module.exports = { idGenerator }
