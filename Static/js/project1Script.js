

function hentKampInfo() {
    const lag1Id = "fotballLag1"
    const lag1 = document.getElementById(lag1Id).value
    const lag2Id = "fotballLag2"
    const lag2 = document.getElementById(lag2Id).value
    const mål1Id = "mål1"
    const mål1 = parseInt(document.getElementById(mål1Id).value);
    const mål2Id = "mål2"
    const mål2 = parseInt(document.getElementById(mål2Id).value);

    let kampResultat = {
        lag1: lag1,
        lag2: lag2,
        mål1: mål1,
        mål2: mål2
    }

    // console.log(kampResultat);
    return kampResultat;
}

function poengUtdeling(kampResultat) {
    // console.log(kampResultat);

    // let kampResultat = hentKampInfo();
    kampResultat.lag1målforskjell = kampResultat.mål1 - kampResultat.mål2;
    kampResultat.lag2målforskjell = kampResultat.mål2 - kampResultat.mål1;

    kampResultat.lag1Poeng = beregnPoeng(kampResultat.lag1målforskjell);
    kampResultat.lag2Poeng = beregnPoeng(kampResultat.lag2målforskjell);
    return kampResultat;

    // if (kampResultat.mål1 > kampResultat.mål2) {
    //     var lag1Poeng = 3;
    // }
    // if (kampResultat.mål1 == kampResultat.mål2) {
    //     var lag1Poeng = 1;
    //     var lag2Poeng = 1;
    // }
    // if (kampResultat.mål1 = 0) {
    //     var lag1Poeng = 0;
    // }
}

function beregnPoeng(målforskjell) {
    if (målforskjell < 0) return 0;
    if (målforskjell == 0) return 1;
    return 3;
}


function genererTabellData(kampresultat) {
    let tabellResultatLag1 = {
        Nr:0,
        Lag:kampresultat.lag1,
        AntallKamper: 1,
        AntallKamperVunnet: kampresultat.lag1Poeng==3?1:0,
        AntallKamperUavgjort:kampresultat.lag1Poeng==1?1:0,
        AntallKamperTapt:kampresultat.lag1Poeng==0?1:0,
        EgneMål:kampresultat.mål1,
        MålMot:kampresultat.mål2,
        MålForskjell:kampresultat.lag1målforskjell,
        PoengSum:kampresultat.lag1Poeng};

    let tabellResultatLag2 = {
        Nr:0,
        Lag:kampresultat.lag2,
        AntallKamper: 1,
    AntallKamperVunnet: kampresultat.lag2Poeng==3?1:0,
    AntallKamperUavgjort:kampresultat.lag2Poeng==1?1:0,
    AntallKamperTapt:kampresultat.lag2Poeng==0?1:0,
    EgneMål:kampresultat.mål2,
    MålMot:kampresultat.mål1,
    MålForskjell:kampresultat.lag2målforskjell,
    PoengSum:kampresultat.lag2Poeng};

    return [tabellResultatLag1, tabellResultatLag2];

}



const endeligResultatTabell=new Map();
function visResultat() {
    let kampResultat = poengUtdeling(hentKampInfo());
    console.log(kampResultat);
    var tabellOppdateringer = genererTabellData(kampResultat);

    
    for (const tabelloppdatering of tabellOppdateringer) {
        if (!endeligResultatTabell.has(tabelloppdatering.Lag)){
            endeligResultatTabell.set(tabelloppdatering.Lag, tabelloppdatering);
        }else{
            let existing = endeligResultatTabell.get(tabelloppdatering.Lag);
            existing.AntallKamper+=1;
            existing.AntallKamperVunnet+=tabelloppdatering.AntallKamperVunnet;
            existing.AntallKamperTapt+=tabelloppdatering.AntallKamperTapt;
            existing.AntallKamperUavgjort+=tabelloppdatering.AntallKamperUavgjort;
            existing.EgneMål+=tabelloppdatering.EgneMål;
            existing.MålMot+=tabelloppdatering.MålMot;
            existing.PoengSum+=tabelloppdatering.PoengSum;
            existing.MålForskjell+=tabelloppdatering.MålForskjell;


            endeligResultatTabell.set(tabelloppdatering.Lag, existing);

        }
    }
    console.log(endeligResultatTabell);

    // let målForksjell1 = kampResultat.mål1 - kampResultat.mål2;
    // let målForksjell2 = kampResultat.mål2 - kampResultat.mål1;
    document.getElementById("resultat").innerHTML +=
        `
  <tr>
  <th>${kampResultat.lag1}</th>
  <th>${kampResultat.lag2}</th>
  </tr>
  <tr>
  <td>Målforksjell:${kampResultat.lag1målforskjell}</td>
  <td>Målforksjell:${kampResultat.lag2målforskjell}</td>
  </tr>
  <tr>
  <td>Poeng:${kampResultat.lag1Poeng}</td>
  <td>Poeng:${kampResultat.lag2Poeng}</td>
  </tr>
  <tr>
      <td>Resultat:${kampResultat.seier}</td>
      <td>Resultat:${kampResultat.seier}</td>
     
     
  </tr>`
}


