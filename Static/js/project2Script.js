const listeMedHytter = [];
listeMedHytter.push({
    hytteNavn: "Gjendesheim", hytter: [
        { hytteNavn: 'Glitterheim', avstand: 22 },
        { hytteNavn: 'Memurubu', avstand: 14 }]
});
listeMedHytter.push({
    hytteNavn: "Glitterheim", hytter: [
        { hytteNavn: 'Gjendesheim', avstand: 22 },
        { hytteNavn: 'Memurubu', avstand: 18 },
        { hytteNavn: 'Spliterstulen', avstand: 17 }]
});


listeMedHytter.push({
    hytteNavn: "Memurubu", hytter: [
        { hytteNavn: 'Gjendesheim', avstand: 14 },
        { hytteNavn: 'Glitterheim', avstand: 18 },
        { hytteNavn: 'Gjendebu', avstand: 10 }]
})
listeMedHytter.push({
    hytteNavn: "Gjendebu", hytter: [
        { hytteNavn: 'Memurubu', avstand: 10 },
        { hytteNavn: 'Leirvassbu', avstand: 19 },
        { hytteNavn: 'Spliterstulen', avstand: 24 },
        { hytteNavn: 'Olavsbu', avstand: 16 }]
})
listeMedHytter.push({
    hytteNavn: "Leirvassbu", hytter: [
        { hytteNavn: 'Gjendebu', avstand: 19 },
        { hytteNavn: 'Spliterstulen', avstand: 15 },
        { hytteNavn: 'Olavsbu', avstand: 11 }]
})
listeMedHytter.push({
    hytteNavn: "Spliterstulen", hytter: [
        { hytteNavn: 'Glitterheim', avstand: 17 },
        { hytteNavn: 'Gjendebu', avstand: 24 },
        { hytteNavn: 'Leirvassbu', avstand: 15 }]
})
listeMedHytter.push({
    hytteNavn: "Olavsbu", hytter: [
        { hytteNavn: 'Gjendebu', avstand: 16 },
        { hytteNavn: 'Leirvassbu', avstand: 11 }]

}
)



/**
 * 
 * @param {parent to remoe children from} parent 
 */
function removeChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

const hytteListeId = 'hytteListe';
const hytteListe = document.getElementById(hytteListeId);
VisHytter(null);
function VisHytter(valgtHytte) {
    if (hytteListe == null) {
        throw Error(`Element med ID '${hytteListeId}' finnes ikke`);
    }
    console.log(`Gjeldende hytte ${valgtHytte}`);
    if (hytteListe.hasChildNodes()) {
        removeChildren(hytteListe);
    }
    if (valgtHytte == null) {
        for (const hytte of listeMedHytter) {
            let li = document.createElement("li");
            li.innerHTML = hytte.hytteNavn;
            li.onclick = function () { VisHytter(hytte) };
            // console.log(li);
            hytteListe.appendChild(li);
        }
    } else {
        for (const hytte of listeMedHytter) {
            if (valgtHytte.hytteNavn == hytte.hytteNavn) {
                if (!leggTilIRute(valgtHytte)) {
                    for (const nesteHytte of hytte.hytter) {
                        let li = document.createElement("li");
                        li.innerHTML = `${nesteHytte.hytteNavn} (${nesteHytte.avstand})`;
                        li.onclick = function () { VisHytter(nesteHytte) };
                        // console.log(li);
                        hytteListe.appendChild(li);

                    }

                

                }
            }
        }
    }
}

const hytteRute = [];
function leggTilIRute(hytte) {
    hytteRute.push(hytte);
    if (hytteRute.length >= 3) {
        VisHytteRute(hytteRute);
        return true;
    }
    else return false;
}

function VisHytteRute(rute) {
    console.log(rute);
    removeChildren(hytteListe);
    const ruteTabell = document.getElementById("hytteRuteTabell");
    for (const hytte of rute) {
        ruteTabell.innerHTML += `<tr>
        <td>${hytte.hytteNavn}</td>
        <td>${hytte.avstand==undefined?'-':hytte.avstand}</td>
        </tr>`
    }

}


// function makeList(alleHytter) {
//     alleHytter.forEach((item) => {
//         let li = document.createElement("li");
//         li.innerText = item.hytte;
//         console.log(li);
//         hytteListe.appendChild(li);
//       });

// }

// makeList(listeMedHytter);