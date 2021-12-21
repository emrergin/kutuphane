let Kutuphanem = [];
const listem=document.getElementById(`KitapListesi`);

function kitapEkle(title, author, pages, read, score){
    Kutuphanem.push(new Kitap(title, author, pages, read, score));
}


function Kitap(title, author, pages, read, score){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.score = score;
    this.info = function(){
        // return (title + ` by ` + author + `, ` + pages + `pages, ` + `${this.read ? "read" : "not read yet"}`);
        return ([title,author,pages,read, score]);
    }
    this.tabloYaz = function(){
        let satir= document.createElement('tr');
        let baslik= document.createElement('td');
        let yazar= document.createElement('td');
        let sayfa= document.createElement('td');
        let okundu= document.createElement('td');
        let puan= document.createElement('td');


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
        read ? checkboks.checked= true : checkboks.checked = false;
        okundu.appendChild(checkboks);
        okundu.classList.add('okundu');
        satir.appendChild(okundu);

        puan.textContent=this.score;
        puan.classList.add('puan');
        satir.appendChild(puan);
        

        return satir;
    }
}



kitapEkle("Beş Kere Halil", "Emre Ergin", 232, true, 5);
kitapEkle("Kaybolduğun Sularda Yüzüyorum", "Elif Sena Ergin", 96, true, 5);

for (let kitap of Kutuphanem){
    listem.appendChild(kitap.tabloYaz());
}