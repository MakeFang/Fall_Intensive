
function items(app){

    app.get('/items', (req,res)=>{
        let items = ['AMZN1', 'AMZN2', 'AMZN3', 'AMZN4', 'AMZN5'];
        console.log(req.query.storesId);
        res.render('items', {items: items, storeId: req.query.storesId});
    });

};

module.exports = items;
