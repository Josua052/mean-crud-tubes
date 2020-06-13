const express = require('express');
const app = express();
const newsRoutes = express.Router();

let News = require('../model/News');

// api to add user
newsRoutes.route('/add').post(function(req, res) {
    let news = new News(req.body);
    news.save()
        .then(news => {
            res.status(200).json({ 'status': 'success', 'mssg': 'news added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get users
newsRoutes.route('/').get(function(req, res) {
    News.find(function(err, nw) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'nw': nw });
        }
    });
});

// api to edit user
newsRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    News.findById(id, function(err, news) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'news': news });
        }
    });
});

// api to update route
newsRoutes.route('/update/:id').post(function(req, res) {
    News.findById(req.params.id, function(err, news) {
        if (!news) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            news.title = req.body.title;
            news.email = req.body.email;
            news.phone_number = req.body.phone_number;

            news.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
newsRoutes.route('/delete/:id').get(function(req, res) {
    News.findByIdAndRemove({ _id: req.params.id }, function(err, ) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = newsRoutes;
