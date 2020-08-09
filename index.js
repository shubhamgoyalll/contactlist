const express = require('express');

const path = require('path');

const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// middleware 1
// app.use(function(res,req,next){
//     req.myName = "shubham";
//     console.log("middleware 1 called");
//     next();
// });

var contactList = [ 
    {
        name : "Shubham",
        phone : "2234323212"
    },
    {
        name : "karan",
        phone : "3432353213",
    },
    {
     name : "preet",
     phone : "100"
    }
]

app.get('/',function(req , res){

    Contact.find({/* This is a query name:"Shubham" */},function(err,contacts){
if(err){
    console.log('Error in fetching contacts from db');
    return;
}

return res.render('home',
{title:"My contact List",
// contact_list : contactList
contact_list : contacts

});

    });
   
});

app.get('/profile',function(req,res){
  return  res.render('practise',{
title : "Profile"
    });
});

app.post('/create-contact',function(req , res){
//  return res.redirect('/profile');
// contactList.push({
//     name : req.body.name,
//     phone : req.body.phone
// });

/* To push contacts 
contactList.push(req.body); */

Contact.create({
    name : req.body.name,
    phone : req.body.phone
},function(err,newContact){
    if(err)
    {
        console.log('error in creating a contact');
    return ;
    }
    console.log('**********',newContact);
    return res.redirect('back');
});

// return res.redirect('back');
});


// for deleting a contact

app.get('/delete-contact',function(req, res){

// get the query from the url
    // console.log(req.params);
    // let phone = req.params.phone;

    //  console.log(req.query);
    // let phone = req.query.phone;

    // Get the id from url in the url
     let id = req.query.id;

     // find the contact in db using id and delete
     Contact.findByIdAndDelete(id, function(err){
         if(err){
             console.log('error in deleting contact from database');
             return ;
         }

         return res.redirect('back');
        });

     });


    /* how we deleted contact before database
    
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1)
    {
        contactList.splice(contactIndex , 1);
    }*/


app.listen(port,function(err){
    if(err)
    {
        console.log('Error is running',err);
    }
    console.log('Yup! Server is running on express on port',port);
});
