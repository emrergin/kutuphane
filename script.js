let Kutuphanem = [];
const listem=document.getElementById(`KitapListesi`);
const basHTML=listem.innerHTML;
const yeniBaslik = document.getElementById('y_baslik');
const yeniYazar = document.getElementById('y_yazar');
const yeniSayfa = document.getElementById('y_sayfa');
const yeniOkundu = document.getElementById('y_oku');
const yeniSkor = document.getElementById('y_skor');
const puanlar = [`-`,0,1,2,3,4,5];

function kitapEkle(title, author, pages, read, score,endeks){
    Kutuphanem.push(new Kitap(title, author, pages, read, score,endeks));
    localStorage.setItem("ktphn", JSON.stringify(Kutuphanem));
    TabloYaz();
    // eventBaslat(); 
}

function TabloYaz(){
    listem.innerHTML=basHTML;
    for (let i = 0; i < Kutuphanem.length; i++) {
        listem.appendChild(Kutuphanem[i].tabloYaz(i));
    }   
}

class Kitap{
    constructor(title,author,pages,read,score,endeks){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.score = score;
        this.indeks=endeks;
    }

    info(){
        return ([title,author,pages,read, score]);
    }
    tabloYaz(endeks){
        let satir= document.createElement('tr');
        let baslik= document.createElement('td');
        let yazar= document.createElement('td');
        let sayfa= document.createElement('td');
        let okundu= document.createElement('td');
        let puan= document.createElement('td');
        let dugme= document.createElement('td');


        baslik.textContent=this.title;
        baslik.classList.add('baslik');
        satir.appendChild(baslik);

        yazar.textContent=this.author;
        yazar.classList.add('yazar');
        satir.appendChild(yazar);

        sayfa.textContent=this.pages;
        sayfa.classList.add('sayfa');
        satir.appendChild(sayfa);

        let checkboks = document.createElement("INPUT");
        checkboks.setAttribute("type", "checkbox");
        checkboks.setAttribute("autocomplete", "off");
        checkboks.classList.add('okunduboks');
        checkboks.setAttribute("onclick","okuToggle(event)")
        this.read ? checkboks.checked= true : checkboks.checked = false;
        okundu.appendChild(checkboks);
        okundu.classList.add('okundu');
        satir.appendChild(okundu);

        let selectList = document.createElement("select");
        selectList.classList.add('puanSec');
        selectList.setAttribute("onchange","puanDegistir(event)")
        for (let i = 0; i < 7; i++) {
            let option = document.createElement("option");
            option.value = puanlar[i];
            option.text = puanlar[i];
            selectList.appendChild(option);
        }
        selectList.value=this.score;
        puan.appendChild(selectList);
        puan.classList.add('puan');
        satir.appendChild(puan);

        let carpi = document.createElement(`button`);
        carpi.textContent=`X`;
        carpi.classList.add('silDugmesi');
        carpi.setAttribute("onclick","veriSil(event)")
        dugme.appendChild(carpi);
        dugme.classList.add('dugme');
        satir.appendChild(dugme);
        
        satir.setAttribute(`data-endeks`,endeks);
        return satir;
    }    
}


function okuToggle(e){
    e.target.checked ? Kutuphanem[e.target.parentNode.parentNode.dataset.endeks].read=true : Kutuphanem[e.target.parentNode.parentNode.dataset.endeks].read=false;
    localStorage.setItem("ktphn", JSON.stringify(Kutuphanem));
}

function veriSil(e){
    Kutuphanem.splice(e.target.parentNode.parentNode.dataset.endeks, 1); 
    e.target.parentNode.parentNode.remove();
    for (let i = 0; i < Kutuphanem.length; i++) { 
        Kutuphanem[i].indeks=i;
    }
    localStorage.setItem("ktphn", JSON.stringify(Kutuphanem));
    TabloYaz();
}

function puanDegistir(e){
    Kutuphanem[e.target.parentNode.parentNode.dataset.endeks].score=e.target.value;
    localStorage.setItem("ktphn", JSON.stringify(Kutuphanem));
}

function openForm(){
    document.getElementById("form").classList.add(`aktif`);
    document.getElementById("form").classList.remove(`uyuyor`);
}

function closeForm(){
    document.getElementById("form").classList.add(`uyuyor`);
    document.getElementById("form").classList.remove(`aktif`);
}

function yeniKaydet(){ 
    if (yeniBaslik.value!==`` && yeniYazar.value!==`` && !yeniSayfa.validity.badInput){
        // && !yeniSayfa.validity.badInput
        kitapEkle(yeniBaslik.value, yeniYazar.value, yeniSayfa.value, yeniOkundu.checked, yeniSkor.value);
        yeniBaslik.value=``;
        yeniYazar.value=``;
        yeniSayfa.value=``;
        yeniOkundu.checked=false; 
        yeniSkor.value=``;
        document.getElementById("form").classList.add(`uyuyor`);
        document.getElementById("form").classList.remove(`aktif`);
    }
    if (yeniBaslik.value===``){
        yeniBaslik.reportValidity();
    }
    if (yeniYazar.value===``){
        yeniYazar.reportValidity();
    }
    if (yeniSayfa.validity.badInput) {
        yeniSayfa.setCustomValidity("Sayfa numarasını rakamlarla girin.");
        yeniSayfa.reportValidity();
    }
}

function herSeyiSil(){
    Kutuphanem=[];
    localStorage.setItem("ktphn", JSON.stringify(Kutuphanem));
    TabloYaz();
}


if(JSON.parse(localStorage.getItem('ktphn'))) {
    KaydedilmisKitaplar=JSON.parse(localStorage.getItem("ktphn"));
    for (eskiKitap of KaydedilmisKitaplar){
        kitapEkle(eskiKitap.title,eskiKitap.author,eskiKitap.pages,eskiKitap.read,eskiKitap.score);
    }
}
else{
    kitapEkle("Beş Kere Halil", "Emre Ergin", 232, false, 5,0);
    kitapEkle("Kaybolduğun Sularda Yüzüyorum", "Elif Sena Ergin", 96, true, 5,1);
}