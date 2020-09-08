const express = require('express'); 
const exphbs = require('express-handlebars');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const port = process.env.PORT || 3000;

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/upload', { 
    useNewUrlParser: true,  //éviter the warnings, erreurs quand on lance le code
    useUnifiedTopolagy: true  //éviter the warnings, erreurs quand on lance le code
}, (err) => {
    if (err !==null) {
        console.log('DB connection error', err);
        return;
    }    
    console.log('DB is connected');
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        index: true,
        default: 'anonyme'
    },
    firstName: String, 
    surname: String,
    profilePicture: String,
    created: {
        type: Date, 
        default: Date.now
    }
}); 

const User = mongoose.model("User", userSchema);

//User.save((err, userDn) => {
//    console.log('err', err);
//    console.log('userDb', user);    
//});


const app = express(); 
app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.render('home');
});

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    
    // 1. créer objet user avec username, firstname, surname et profilepicture - body
    const jean = new User({
        username: "JG", 
        firstname: "Jean",
        surname: "Gao", 
        profilepicture: "Jean Gao.jpg"
    }); 
    
    const binta = new User({
        username: "BJ", 
        firstname: "Binta",
        surname: "Jammeh", 
        profilepicture: "Binta Jammeh.jpg"
    }); 

    const agathe = new User({
        username: "AR", 
        firstname: "Agathe",
        surname: "Roujou", 
        profilepicture: "Agathe Roujou.jpg"
    }); 

    const adil = new User({
        username: "AD", 
        firstname: "Adil",
        surname: "Daoumer", 
        profilepicture: "Adil Daoumer.jpg"
    }); 

    // 2. save objet user
    jean.save((err, userDb) => {
        console.log('err', err); 
        console.log('userDb', userDb);        
    }); 

    binta.save((err, userDb) => {
        console.log('err', err); 
        console.log('userDb', userDb);        
    });

    agathe.save((err, userDb) => {
        console.log('err', err); 
        console.log('userDb', userDb);        
    });

    adil.save((err, userDb) => {
        console.log('err', err); 
        console.log('userDb', userDb);        
    });
     
}); 



app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});


//mongoose.connection.close();