let Kutuphanem = [];
const listem=document.getElementById(`KitapListesi`);
const basHTML=listem.innerHTML;
const yeniBaslik = document.getElementById('y_baslik');
const yeniYazar = document.getElementById('y_yazar');
const yeniSayfa = document.getElementById('y_sayfa');
const yeniOkundu = document.getElementById('y_oku');
const yeniSkor = document.getElementById('y_skor');

function kitapEkle(title, author, pages, read, score,endeks){
    Kutuphanem.push(new Kitap(title, author, pages, read, score,endeks));

    TabloYaz();
    eventBaslat(); 
}

function TabloYaz(){
    listem.innerHTML=basHTML;
    for (let i = 0; i < Kutuphanem.length; i++) {
        listem.appendChild(Kutuphanem[i].tabloYaz(i));
    }   
}

function eventBaslat(){
    let okundular = document.querySelectorAll(`.okunduboks`);
    okundular.forEach((okundu) => {
        okundu.addEventListener('click', okuToggle);
      });
    
    let dugmeler = document.querySelectorAll(`.silDugmesi`);
    dugmeler.forEach((sdugme) => {
        sdugme.addEventListener('click', veriSil);
      });
}

function Kitap(title, author, pages, read, score,endeks){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.score = score;
    this.info = function(){
        // return (title + ` by ` + author + `, ` + pages + `pages, ` + `${this.read ? "read" : "not read yet"}`);
        return ([title,author,pages,read, score]);
    }
    this.tabloYaz = function(endeks){
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
        this.read ? checkboks.checked= true : checkboks.checked = false;
        okundu.appendChild(checkboks);
        okundu.classList.add('okundu');
        satir.appendChild(okundu);

        puan.textContent=this.score;
        puan.classList.add('puan');
        satir.appendChild(puan);

        let carpi = document.createElement(`button`);
        carpi.textContent=`X`;
        carpi.classList.add('silDugmesi');
        dugme.appendChild(carpi);
        dugme.classList.add('dugme');
        satir.appendChild(dugme);
        
        satir.setAttribute(`data-endeks`,endeks);
        return satir;
    }
    this.indeks=endeks;
}

function okuToggle(e){
    // console.log(Kutuphanem[e.target.parentNode.parentNode.dataset.endeks].read);
    e.target.checked ? Kutuphanem[e.target.parentNode.parentNode.dataset.endeks].read=true : Kutuphanem[e.target.parentNode.parentNode.dataset.endeks].read=false;
    // console.log(Kutuphanem[e.target.parentNode.parentNode.dataset.endeks].read);
}

function veriSil(e){
    // console.log(e.target.parentNode.parentNode.dataset);
    Kutuphanem.splice(e.target.parentNode.parentNode.dataset.endeks, 1); 
    e.target.parentNode.parentNode.remove();
    for (let i = 0; i < Kutuphanem.length; i++) { 
        Kutuphanem[i].indeks=i;
    }
    TabloYaz();
    eventBaslat();
}

function openForm(){
    // console.log(`aceleye gerek yok`);
    document.getElementById("form").classList.add(`aktif`);
    document.getElementById("form").classList.remove(`uyuyor`);
}

function closeForm(){
    document.getElementById("form").classList.add(`uyuyor`);
    document.getElementById("form").classList.remove(`aktif`);
}

function yeniKaydet(){ 
    if (yeniBaslik.value!==`` && yeniYazar.value!==``){
        kitapEkle(yeniBaslik.value, yeniYazar.value, yeniSayfa.value, yeniOkundu.checked, yeniSkor.value);
        yeniBaslik.value=``;
        yeniYazar.value=``;
        yeniSayfa.value=``;
        yeniOkundu.checked=false; 
        yeniSkor.value=``;
        document.getElementById("form").classList.add(`uyuyor`);
        document.getElementById("form").classList.remove(`aktif`);
    }
}

kitapEkle("Beş Kere Halil", "Emre Ergin", 232, false, 5,0);
kitapEkle("Kaybolduğun Sularda Yüzüyorum", "Elif Sena Ergin", 96, true, 5,1);



