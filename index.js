#!/usr/bin/env node
var clc           = require("cli-color");
const { program } = require('commander');
const fs          = require('fs');

const tprojeCreate = require('./create/proje.js');

program.version('0.0.1');

program
  .option('-install, --install', 'kurulumu başlat')
  .option('-table, --table', 'tablo ekle')
  .option('-tjson, --tjson', 'json dosyasından tablolar oluştur');
program.parse(process.argv);

if(program.install){
  /* instal */
  if(process.argv.length != 4){
    console.log(clc.red("> vue-cli -install <proje_name>"));
  }else{


    const proje_name = process.argv[3];
    console.log(clc.green("[" + proje_name+"] proje oluşturuluyor"));

  
    tprojeCreate.create(proje_name);

  }

}else if(program.table){
  /* instal */
  if(process.argv.length != 4){
    console.log(clc.red("> vue-cli -install <proje_name>"));
  }else{


    const table_name = process.argv[3];
    console.log(clc.green("[" + table_name+"] Tablo oluşturuluyor"));

    /* index tableye git gerekli seçme işlemlerini yaptır  */
    const ins = require('./index-table');
    let sec = ins.create(table_name);
    

  }

}else if(program.tjson){
  /* json dosyasından tablo oluştur */
  if(process.argv.length != 4){
    console.log(clc.red("> vue-cli --tjson <json_file>"));
  }else{
    const json_file = process.argv[3];
    console.log(clc.green("[" + json_file+"] JSON dosyasından tablolar oluşturuluyor"));

    // JSON dosyasını oku
    try {
      const tableData = JSON.parse(fs.readFileSync(json_file, 'utf8'));
      const tableCreate = require('./create/table.js');
      
      // Async fonksiyon oluşturup hemen çalıştır
      (async () => {
        try {
          // JSON içindeki her tabloyu oluştur
          let tableCount = 0;
          for (const tableName in tableData) {
            const columns = tableData[tableName];
            console.log(clc.green(`[${tableName}] tablosu oluşturuluyor`));
            // Async olarak bekle
            await tableCreate.create(tableName, columns);
            tableCount++;
          }
          
          console.log(clc.green(`Toplam ${tableCount} tablo oluşturuldu.`));
        } catch (err) {
          console.log(clc.red(`Hata oldu: ${err.message}`));
        }
      })();
    } catch (err) {
      console.log(clc.red(`Hata: ${err.message}`));
      console.log(clc.red("JSON dosyası okunamadı veya geçerli bir format değil."));
    }
  }
}else{
  console.log(clc.red("> vue-cli --help yazabilirsiniz.."));
}
