'use strict';

(function () {
    document.addEventListener('DOMContentLoaded', alusta);

    async function alusta(){
        try{
            const data = await fetch('/haeKaikki');
            const henkilot=await data.json();

            const tulosjoukko=document.getElementById('tulosjoukko');
            for(let henkilo of henkilot){
                const tr=document.createElement('tr');
                tr.appendChild(teeSolu(henkilo.id));
                tr.appendChild(teeSolu(henkilo.etunimi));
                tr.appendChild(teeSolu(henkilo.sukunimi));
                tr.appendChild(teeSolu(henkilo.osasto));
                tr.appendChild(teeSolu(henkilo.palkka));
                tulosjoukko.appendChild(tr);
            }
        }
        catch(virhe){
            const viestialue=document.getElementById('viestialue');
            viestialue.textContent=`Virhe: ${virhe.message}`;
            viestialue.setAttribute('class','virhe');
        }
    } //alusta loppu

    function teeSolu(tieto){
        const td=document.createElement('td');
        td.textContent=tieto;
        return td;
    }
})();