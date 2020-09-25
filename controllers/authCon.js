const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const { render } = require("ejs");

// base path /

//register form
router.get("/register", (req, res) => {
    res.render('auth/register', {message: ''});
})


// register post 
router.post("/register", async (req, res) => {
    try {
        const foundEmail = await db.User.findOne({email: req.body.email})
        const foundUsername = await db.User.findOne({username: req.body.username})
        if(foundEmail || foundUsername) res.render("auth/register",{message: "username or email taken"})

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        await db.User.create(req.body);
        console.log(req.body)
        res.redirect("/login")
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
})

// login form (/login)
router.get('/login', (req,res) =>{
    res.render("auth/login", {message:''})
})


// login post 
router.post("/login", async(req,res) => {
    try {
        const foundUser = await db.User.findOne({email: req.body.email});
        if(!foundUser){
            return res.render('auth/login',{message: "Username or password incorrect"});
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match){
            return res.render('auth/login', {message: "Username or password incorrect"});
        }

        
        req.session.currentUser = {
            username: foundUser.username,
            id: foundUser._id,
        }

        res.redirect('/');
    }catch(error){
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
})

//logout
router.delete('/logout', async (req, res) => {
    await req.session.destroy();
    res.redirect('/');
})

//add to favorites
router.put('/:id/addGameFav', async(req,res) => {
    try {
        console.log(req.session.currentUser)
        if(req.session.currentUser){
            const user = await db.User.findById(req.session.currentUser.id);
            
            if(user.favGames.length > 0){
                if(user.favGames.includes(req.params.id)) return res.redirect(`/games/${req.params.id}`)

                user.favGames.push(req.params.id);
            }else{
                user.favGames = [req.params.id]
            }
            user.save();
            res.redirect(`/games/${req.params.id}`);
        }else{
            res.redirect(`/games/${req.params.id}`);
        }

    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
})

//add favorite dev
router.put('/:id/addDevFav', async(req,res) => {
    try {
        console.log(req.session.currentUser)
        if(req.session.currentUser){
            const user = await db.User.findById(req.session.currentUser.id);
            
            if(user.favDevs.length > 0){
                if(user.favDevs.includes(req.params.id)) return res.redirect(`/devs/${req.params.id}`)

                user.favDevs.push(req.params.id);
            }else{
                user.favDevs = [req.params.id]
            }
            console.log(user.favDevs)
            user.save();
            res.redirect(`/devs/${req.params.id}`);
        }else{
            res.redirect(`/devs/${req.params.id}`);
        }

    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
})

//remove from fav list
router.put('/:id/rmGameFav', async(req,res) => {
    try {
        if(req.session.currentUser){

            const user = await db.User.findById(req.session.currentUser.id);
            
            user.favGames.remove(req.params.id)
            user.save();

            res.redirect(`/games/${req.params.id}`)
        }else{
            res.redirect(`/games/${req.params.id}`);
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
})
router.put('/:id/rmDevFav', async(req,res) => {
    try {
        if(req.session.currentUser){

            const user = await db.User.findById(req.session.currentUser.id);
            
            user.favDevs.remove(req.params.id)
            user.save();

            res.redirect(`/devs/${req.params.id}`)
        }else{
            res.redirect(`/devs/${req.params.id}`);
        }
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
})

module.exports = router;
