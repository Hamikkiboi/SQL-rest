'use strict';

const path = require('path');

const express = require('express');
const app = express();

// const fetch = require('node-fetch');
const fetch = require('./fetchlib');

const {port,host} = require('./config.json');

const valikkopolku = path.join(__dirname,'valikko.html');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.get('/', (req,res)=>res.sendFile(valikkopolku));

app.get('/haeKaikki', (req,res)=>{
    fetch('http://localhost:4000/api/henkilot', {mode:'cors'})
    .then(data=>data.json())
    .then(tulos=>res.json(tulos))
    .catch(virhe=>res.json(virhe));
});

app.post('/haeYksi', (req,res)=>{
    const id=req.body.id;
    fetch(`http://localhost:4000/api/henkilot/${id}`,{mode:'cors'})
    .then(data=>data.json())
    .then(tulos=>res.json(tulos))
    .catch(virhe=>res.json(virhe));
});

app.post('/poista', (req, res) => {
    const id = req.body.id;
    fetch(`http://localhost:4000/api/henkilot/${id}`, 
            {method:'DELETE', mode: 'cors' })
        .then(data => data.json())
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe));
});

app.post('/lisaa', (req,res)=>{
    const henkilo=req.body;
    const optiot={
        method:'POST',
        mode:'cors',
        body:JSON.stringify(henkilo),
        headers:{
            'Content-Type':'application/json'
        }
    };
    fetch(`http://localhost:4000/api/henkilot`,optiot)
        .then(data => data.json())
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe));
});

app.post('/muuta', (req, res) => {
    const henkilo = req.body;
    const optiot = {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(henkilo),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(`http://localhost:4000/api/henkilot/${henkilo.id}`, optiot)
        .then(data => data.json())
        .then(tulos => res.json(tulos))
        .catch(virhe => res.json(virhe));
});

app.listen(port,host,
    ()=>console.log(`${host}:${port} kuuntelee`));