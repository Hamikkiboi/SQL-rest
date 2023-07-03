'use strict';

(function(){
    let idKentta;
    let etunimiKentta;
    let sukunimiKentta;
    let osastoKentta;
    let palkkaKentta;

    document.addEventListener('DOMContentLoaded', alusta);

    function alusta(){
        idKentta=document.getElementById('id');
        etunimiKentta=document.getElementById('etunimi');
        sukunimiKentta=document.getElementById('sukunimi');
        osastoKentta=document.getElementById('osasto');
        palkkaKentta=document.getElementById('palkka');

        document.getElementById('laheta')
            .addEventListener('click',laheta);

        idKentta.addEventListener('focus', tyhjenna);
    }

    function tyhjenna(){
        idKentta.value='';
        etunimiKentta.value='';
        sukunimiKentta.value = '';
        osastoKentta.value = '';
        palkkaKentta.value = '';
        tulosalue.textContent='';
        tulosalue.removeAttribute('class');
    }

    async function laheta(){
        const henkilo={
            id: +idKentta.value,
            etunimi: etunimiKentta.value,
            sukunimi: sukunimiKentta.value,
            osasto: osastoKentta.value,
            palkka: +palkkaKentta.value
        };

        try{
            const optiot={
                method:'POST',
                body:JSON.stringify(henkilo),
                headers:{
                    'Content-Type':'application/json'
                }
            };
            const data=await fetch('/lisaa',optiot);
            const tulos=await data.json();

            paivitaStatus(tulos);
        }
        catch(virhe){
            paivitaStatus({ viesti: virhe.message, tyyppi: 'virhe' });
        }
    }//laheta loppu

    function paivitaStatus(status) {
        tulosalue.textContent = status.viesti;
        tulosalue.setAttribute('class', status.tyyppi);
    } //paivitaStatus loppu
})();