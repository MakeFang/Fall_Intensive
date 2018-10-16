const Store = require('../models/store.js');


function stores(app){

    // const fakeStore = {owner: 'Fang', inventory: ['book', 'dog']};
    // let fstore = new Store(fakeStore);
    //
    // console.log('save data');
    // fstore.save((err, data)=>{
    //     console.log(data);
    // });

    app.get('/',(req,res)=>{
        res.redirect('/stores');
    })

    app.get('/stores', (req,res)=>{
        Store.find().then((stores)=>{
            res.render('home.handlebars', {stores: stores});
        }).catch((err)=>{
            console.log(err.message);
        })
    })

    app.get('/stores/new', (req, res)=>{
        res.render('stores-new');
    })

    app.get('/stores/:storeId', (req,res)=>{
        Store.findById(req.params.storeId).then((store)=>{
            res.render('stores-show', {store : store});
        }).catch((err)=>{
            console.log(err.message);
        })
    })

    app.get('/stores/:storeId/edit', (req, res)=>{
        Store.findById(req.params.storeId).then((store)=>{
             res.render('stores-edit', {store: store});
         }).catch((err)=>{
             console.log(err.message);
         })
    })

    app.post('/stores', (req,res)=>{
        // console.log(req.body);
        Store.create(req.body).then((store)=>{
            console.log(store);
            res.redirect(`/stores/${store._id}`);
        }).catch((err)=>{
            console.log(err.message);
        })
    })
    //
    app.put('/stores/:storeId', (req,res)=>{
        console.log(req.body);
        Store.findByIdAndUpdate(req.params.storeId, req.body).then((store)=>{
            console.log(store);
            res.redirect(`/stores/${store._id}`);
        }).catch((err)=>{
            console.log(err.message);
        })
    })

    app.patch('/stores/:storeId', (req,res)=>{
        console.log(`patching `,req.body);
        if (req.query.add == 'true'){
            Store.findByIdAndUpdate(req.params.storeId
                , {$addToSet: {inventory: {$each: req.body.inventory}}}).then((store)=>{
                console.log(store);
                res.redirect(`/stores/${store._id}`);
            }).catch((err)=>{
                console.log(err.message);
            })
        }
        else{
            console.log('not add');
            console.log(req.body);
            Store.findByIdAndUpdate(req.params.storeId
                , {$pull: {inventory: req.body.inventory}}).then((store)=>{
                console.log(store);
                res.redirect(`/stores/${store._id}`);
            }).catch((err)=>{
                console.log(err.message);
            })
        }
    })
    //
    app.delete('/stores/:storeId', (req,res)=>{
        Store.findByIdAndDelete(req.params.storeId).then((store)=>{
            res.redirect(`/stores`);
        }).catch((err)=>{
            console.log(err.message);
        })
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log('App listening on port 3000!');
    })

}

module.exports = stores;
