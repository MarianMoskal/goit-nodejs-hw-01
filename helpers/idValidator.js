function idValidator (array, id){
    for (const el of array) {
        if (id == el.id) {
            return
        }
    }

    throw new Error('Contact not found. Try different id.');
}
module.exports = { idValidator };