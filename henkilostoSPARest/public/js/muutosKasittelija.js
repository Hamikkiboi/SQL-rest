'use strict';

(function(){
    let idKentta;
    let etunimiKentta;
    let sukunimiKentta;
    let osastoKentta;
    let palkkaKentta;
    let tulosalue;

    let hakutila=true;

    document.addEventListener('DOMContentLoaded', alusta);

    function alusta(){
        idKentta=document.getElementById('id');
        etunimiKentta=document.getElementById('etunimi');
        sukunimiKentta=document.getElementById('sukunimi');
        osastoKentta=document.getElementById('osasto');
        palkkaKentta=document.getElementById('palkka');

        tulosalue=document.getElementById('tulosalue');

        hakutila = true;
        paivitaKenttaAttribuutit();

        document.getElementById('laheta')
            .addEventListener('click', laheta);

        idKentta.addEventListener('focus',tyhjenna);
    }

    function tyhjenna(){
        //koodi tähän
        if(hakutila) {
            paivitaKenttienTiedot(); //tyhjentää kentät
        }
        tulosalue.textContent = '';
        tulosalue.removeAttribute('class');
    }

    function paivitaKenttaAttribuutit(){
        if(hakutila){
            idKentta.removeAttribute('readonly');
            etunimiKentta.setAttribute('readonly', true);
            sukunimiKentta.setAttribute('readonly', true);
            osastoKentta.setAttribute('readonly', true);
            palkkaKentta.setAttribute('readonly', true);
        }
        else{
            idKentta.setAttribute('readonly', true);
            etunimiKentta.removeAttribute('readonly');
            sukunimiKentta.removeAttribute('readonly');
            osastoKentta.removeAttribute('readonly');
            palkkaKentta.removeAttribute('readonly');
        }
    } //paivitaKenttaAttribuutit loppu

    function paivitaKenttienTiedot(henkilo){
        if(henkilo){
            idKentta.value=henkilo.id;
            etunimiKentta.value=henkilo.etunimi;
            sukunimiKentta.value=henkilo.sukunimi;
            osastoKentta.value=henkilo.osasto;
            palkkaKentta.value=henkilo.palkka;
            hakutila=false;
        }
        else{
            idKentta.value = '';
            etunimiKentta.value = '';
            sukunimiKentta.value = '';
            osastoKentta.value = '';
            palkkaKentta.value = '';
            hakutila=true;
        }
        paivitaKenttaAttribuutit();
    }

    function paivitaStatus(status) {
        tulosalue.textContent = status.viesti;
        tulosalue.setAttribute('class', status.tyyppi);
    } //paivitaStatus loppu

    async function laheta(){
        try{
            if(hakutila){
                //hae henkilö ja täytä kentät
                const id=+idKentta.value;
                const optiot = {
                    method:'POST',
                    body:JSON.stringify({id}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                };
                if(id>0){
                    const data = await fetch(`/haeYksi`, optiot);
                    const tulos = await data.json();
                    if (tulos.viesti) {
                        paivitaStatus(tulos);
                    }
                    else {
                        paivitaKenttienTiedot(tulos);
                    }
                }
                else{
                    paivitaStatus({ viesti: 'tyhjä id', tyyppi: 'virhe' });
                }
            }
            else{
                //lähetä muutettu henkilö
                const henkilo={
                    id:+idKentta.value,
                    etunimi:etunimiKentta.value,
                    sukunimi:sukunimiKentta.value,
                    osasto:osastoKentta.value,
                    palkka:+palkkaKentta.value
                };

                const optiot={
                    method:'POST',
                    body:JSON.stringify(henkilo),
                    headers:{
                        'Content-Type':'application/json'
                    }
                };

                const data = await fetch(`/muuta`, optiot);
                const tulosJson=await data.json();
                if(tulosJson.viesti){
                    paivitaStatus(tulosJson);
                }
                hakutila=true;
                paivitaKenttaAttribuutit();
            }

        }
        catch(virhe){
            paivitaStatus({ viesti: virhe.message, tyyppi: 'virhe' });
        }

    }


})();