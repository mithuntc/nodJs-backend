
const db = require('_helpers/db');
const Customer = db.Customer;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Customer.find();
}

async function getById(id) {
    return await Customer.findById(id);
}

async function create(userParam) {
    // validate
    if (await Customer.findOne({ name: userParam.name })) {
        throw 'Name "' + userParam.name + '" Name is already taken';
    }

    const customer = new Customer(userParam);

    

    // save user
    await customer.save();
}

async function update(id, userParam) {
    const customer = await Customer.findById(id);

    // validate
    if (!customer) throw 'User not found';
    if (customer.name !== userParam.name && await Customer.findOne({ name: userParam.name })) {
        throw 'Name "' + userParam.name + '" name is already taken';
    }

   

    // copy userParam properties to user
    Object.assign(customer, userParam);

    await customer.save();
}

async function _delete(id) {
    await customer.findByIdAndRemove(id);
}