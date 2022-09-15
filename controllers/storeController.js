const mongoose = require('mongoose');
const { options } = require('../routes');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {  
    console.log('name', req.name);
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    // 1. Query the database for st of all stores
    const stores = await Store.find();
    res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
    //  1. Find the store givern the ID
    const store = await Store.findOne({ _id: req.params.id });
    //  2.confirm the u are the owner of the store
    //  3. Render out the edit form so the user can update their store
    res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
    // find and ldate the store
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`)
    res.redirect(`/stores/${store._id}/edit`);
    // Redirect them the store and thell them it worked
};
