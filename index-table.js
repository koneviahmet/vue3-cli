/* dosya işlemleri modulunu entegre edelim */
const fs          = require('fs');
const prompts     = require('prompts');
const tableCreate = require('./create/table.js');
const slash       = require('slash');

let sec = [];

/* komut satırının başlatıldığı dizini alalım */
const dizin = process.env.PWD;

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
if(process.env.OS == "Windows_NT"){dir = slash(dir);}


const sor = (table_name) => {
  new Promise(function(resolve, reject) {
    /* sor cevapla 1 */
    (async () => {
      /* kaç db olacağını seçiyoruz */
      const response = await prompts({
        type: 'number',
        name: 'dbAdet',
        message: 'Tabloya kaydedilecek sutunların  sayısı kaçtır? örnek: kitaplar tablosu için kitap_adi, kitap_yazari olmak üzere 2 sutun ekleyebilirsiniz.',
        validate: value => value > 1 ||  value < 50 ? true: message
      });


      /* seçilen db lere isim veriyoruz */
      for (var i = 1; i < response.dbAdet + 1; i++) {

        const sorSutun = await prompts({
          type: 'text',
          name: 'satirAdi',
          message: i + '. sutunun adını yazınız. ör: kitap_adi'
        });


        sec.push(sorSutun.satirAdi);
      }

      tableCreate.create(table_name, sec);
      //console.log(sec);
    })();


  });
}



/* exportlar içinde bir promise yapalım  */
async function olustur(table_name){
  /* tablo adını küçültelim */
  //table_name = table_name.charAt(0).toUpperCase() + table_name.slice(1);
  table_name = table_name.toLowerCase();
  return await sor(table_name);
}


module.exports.create = olustur;
