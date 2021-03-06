const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn.js')

// GET /clothing
router.get('/', isLoggedIn, (req,res) => {
    db.user.findByPk(req.user.id)
    .then(user => {
        user.getClothings().then(clothing => {
            let statusFilter = req.query.statusFilter
            if(statusFilter!=='All') {
                clothing = clothing.filter(clothing => {
                    return clothing.status === statusFilter
                })
            }
            res.render('clothing/index.ejs', {clothing: clothing})
        })
    })
    .catch(err => {
        console.log(err)
    })
})

// GET /clothing/new
router.get('/new', isLoggedIn, (req,res) => {
    res.render('clothing/new')
})

// POST /clothing/new
router.post('/', isLoggedIn, (req,res) => {
    db.category.findOrCreate({
        where: {name: req.body.category}
    })
    .then(([category, created]) => {
        category.createClothing({
            userId: req.user.id,
            style: req.body.style,
            status: req.body.status,
            brand: req.body.brand,
            material: req.body.material,
            color: req.body.color,
            condition: req.body.condition
        })
        res.redirect('/clothing')
    })
    .catch(err => {
        console.log(err)
    })
})

// GET /clothing/:id
router.get('/:id', isLoggedIn, (req,res) => {
    db.user.findOne({
        where: {id: req.user.id},
        include: [db.clothing, db.shelter]
    })
    .then(user=> {
        user.getClothings({where: {id: req.params.id}, include: [db.category, db.shelter]})
        .then(clothing => {
            // console.log(clothing[0].color)
            res.render('clothing/show', {user: user, clothing: clothing})
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })

// --- This works DO NOT TOUCH --- //
    // db.clothing.findOne({
    //     where: {id: req.params.id},
    //     include: [db.category, db.shelter]
    // })
    // .then(clothing => {
    //     res.render('clothing/show', {clothing: clothing})
    // })
    // .catch(err => {
    //     console.log(err)
    // })
})

// GET /clothing/edit/:id
router.get('/edit/:id', isLoggedIn, (req,res) => {
    db.user.findByPk(req.user.id)
    .then(user => {
        user.getClothings({where: {id: req.params.id}, include: [db.category, db.shelter]})
        .then(clothing => {
            res.render('clothing/edit', {clothing: clothing})
        })
        .catch(err => {
            console.log(err)
        })
    })
})

// PUT /clothing/edit/:id
router.put('/:id', isLoggedIn, (req,res) => {
    db.user.findByPk(req.user.id)
    .then(user => {
        user.getClothings({where: {id: req.params.id}, include: [db.category, db.shelter]})
        .then(clothing => {
            db.clothing.update({
            style: req.body.style,
            status: req.body.status,
            brand: req.body.brand,
            material: req.body.material,
            color: req.body.color,
            condition: req.body.condition
            },
        {
            where: {id: req.body.id},
            include: [db.category]
        })
        db.clothing.findOne({
            where: {id: req.body.id},
            include: [db.category]
        })
        .then(foundClothing => {
            db.category.findOrCreate({
                where: {name: req.body.category}
            })
            .then(([newCategory, created]) => {
                foundClothing.setCategory(newCategory)
                res.redirect(`/clothing/${req.body.id}`)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})


// ASYNC WAY
// router.put('/:id', isLoggedIn, async(req,res) => {
//     try{
//         await db.clothing.update({
//             style: req.body.style,
//             status: req.body.status,
//             brand: req.body.brand,
//             material: req.body.material,
//             color: req.body.color,
//             condition: req.body.condition
//         },
//         {
//             where: {id: req.body.id},
//             include: [db.category]
//         })
//         const foundClothing = await db.clothing.findOne({
//             where: {id: req.body.id},
//             include: [db.category]
//         })
//         const [foundOrCreated, isCreated] = await db.category.findOrCreate({
//             where: {name: req.body.category}
//         })
//         await foundClothing.setCategory(foundOrCreated)
//         res.redirect(`/clothing/${req.body.id}`)
//     }
//     catch(err){
//         console.log(err)
//         res.redirect(`/clothing/${req.body.id}`)
//     }
// })

// DELETE /clothing/:id
router.delete('/:id', isLoggedIn, (req,res) => {
    db.user.findByPk(req.user.id)
    .then(user => {
        user.getClothings({where: {id: req.params.id}, include: [db.category, db.shelter]})
        .then(clothing => {
            db.clothing.destroy({
                where: {id: req.body.id}
            })
            .then(deleted => {
                res.redirect('/clothing')
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

// POST /clothing/:id
router.post('/:id', isLoggedIn, (req,res) => {
    db.user.findByPk(req.user.id)
    .then(user => {
        user.getClothings({where: {id: req.params.id}})
        .then(clothing => {
            db.clothing.findByPk(req.body.clothingId)
            .then(clothing => {
                db.shelter.findByPk(req.body.shelterId)
                .then(shelter => {
                    shelter.addClothing(clothing)
                    res.redirect(`/clothing/${req.body.clothingId}`)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router