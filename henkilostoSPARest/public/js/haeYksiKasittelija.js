'use strict';

(function (){
    let tulosalue;
    let syote;

    document.addEventListener('DOMContentLoaded', alusta);

    function alusta(){
        tulosalue=document.getElementById('tulosalue');
        syote = document.getElementById('henkiloId');
        document.getElementById('hae')
            .addEventListener('click', ()=>laheta(true));
        document.getElementById('poista')
            .addEventListener('click', ()=>laheta(false));
        syote.addEventListener('focus', tyhjenna);
    }

    function tyhjenna(){
        syote.value='';
        tulosalue.textContent='';
    }
    async function laheta(hae){
        const id=syote.value;
        if(id<=0){
            paivitaStatus({ viesti: 'id oli tyhjä', tyyppi: 'virhe' });
        }
        else{
            try {
                const optiot={
                    method:'POST',
                    body:JSON.stringify({id}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                const reitti = hae ?'/haeYksi':'/poista';
                
                const data = await fetch(reitti,optiot);
                const tulos = await data.json();

                if (tulos.viesti) {
                    paivitaStatus(tulos);
                }
                else {
                    paivitaTiedot(tulos);
                }
            }
            catch (virhe) {
                paivitaStatus({ viesti: virhe.message, tyyppi: 'virhe' });
            }
        }
        
    } //laheta loppu

    function paivitaStatus(status){
        tulosalue.textContent = status.viesti;
        tulosalue.setAttribute('class', status.tyyppi);
    }

    function paivitaTiedot(henkilo){
        tulosalue.innerHTML=`
        <p><span class="selite">Id:</span> <span class="tieto">${henkilo.id}</span></p>
        <p><span class="selite">Etunimi:</span> <span class="tieto"> ${henkilo.etunimi}</span></p>
        <p><span class="selite">Sukunimi:</span> <span class="tieto"> ${henkilo.sukunimi}</span></p>
        <p><span class="selite">Osasto:</span> <span class="tieto"> ${henkilo.osasto}</span></p>
        <p><span class="selite">Palkka:</span> <span class="tieto"> ${henkilo.palkka} €</span></p>
        `;
        tulosalue.removeAttribute('class');
    }

})();