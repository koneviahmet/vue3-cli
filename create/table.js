const fs    = require('fs');
const _     = require('lodash');
const afs   = require('../afs.js');
const slash = require('slash');
var clc     = require("cli-color");

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
if(process.env.OS == "Windows_NT"){dir = slash(dir);}
dir = dir.replace("/create", "");

const dizin = process.env.PWD;

let models          = dir + '/copy/codeigniter/application/models/';
let controllers     = dir + '/copy/codeigniter/application/controllers/';
let views           = dir + '/copy/codeigniter/application/views/klasik/';
let viewsTaslakCopy = dir + '/copy/codeigniter/application/views/klasik/content/taslakCopy/';
let js              = dir + '/copy/codeigniter/application/views/klasik/index/js/';

// async/await
async function asenkronAkis(table_name, secJson){
    try {
      //table_name => hepsi_kucuk

      /* baş harfi Büyük*/
      const table_nameUF = _.upperFirst(table_name);



      /*
      _.join(str,'/') //implode
      _.forEach(secJson,(value) => {
        console.log(value);
      });
      */

      /*
      let deneme  = await afs.readFile('codeigniter/deneme.php');
      let denemeD = await afs.replaceFile(deneme, 'ol', table_name + ' oldu ');
      await writeFile('codeigniter/deneme.php', denemeD);
      */

      let codeigniter_durum  = await afs.isFile('src');
      if(!codeigniter_durum){
        console.log(clc.red("cd <proje_name>"));
      }else{
        let application_durum  = await afs.isFile('src');
        if(!application_durum){
          console.log(clc.red("vue-cli -install <proje_name>"));
        }else{
          // tablo daha önce oluşturulmuş mu ona bakalım 
          let model_durum  = await afs.isFile('src/router/routers/'+table_name+'.js');
          //let model_durum  = false;
          if(model_durum && 1==2){
            console.log(clc.red("tablo daha önce eklenmiş."));
          }else{
            // her şey yolunda değişimleri yapabilirsin
            console.log(clc.red("her şey yolunda o halde devam"));

            /* views */
            await afs.copy_all_file(dir, '/copy/vue-cli/src/views/schema', "src/views/"+table_name);

            /* components */
            await afs.copy_all_file(dir, '/copy/vue-cli/src/components/content/schema', "src/components/content/"+table_name);

            /* compositions */
            await afs.copy_all_file(dir, '/copy/vue-cli/src/compositions/useModelSchema.js', "src/compositions/useModel"+table_nameUF+".js");

            /* router */
            await afs.copy_all_file(dir, '/copy/vue-cli/src/router/routers/schema.js', "src/router/routers/"+table_name+".js");
            
            /* services */
            await afs.copy_all_file(dir, '/copy/vue-cli/src/services/SchemaServices.js', "src/services/"+table_nameUF+"Services.js");

            /*
            // models 
            let taslak_model  = await afs.readFile(models + 'taslak_model.php');
            let taslak_modelD = await afs.replaceFile(taslak_model, 'taslak', table_name);
            taslak_modelD = await afs.replaceFile(taslak_modelD, 'Taslak', table_nameUF);

            let createTable = "";
            _.forEach(secJson,(value) => {
              createTable += "'"+value+"'=>array('type' =>'VARCHAR','constraint' => 255), \n";
            });

            taslak_modelD = await afs.replaceFile(taslak_modelD, '#createTable#', createTable);
            taslak_modelD = await afs.replaceFile(taslak_modelD, "'satir'", "//'satir'");
            await writeFile('application/models/'+table_name+'_model.php', taslak_modelD);

            // controllers 
            let h_taslak  = await afs.readFile(controllers + 'h_taslak.php');
            let h_taslakD = await afs.replaceFile(h_taslak, 'taslak', table_name);
            h_taslakD = await afs.replaceFile(h_taslakD, 'Taslak', table_nameUF);
            await writeFile('application/controllers/h_'+table_name+'.php', h_taslakD);
            */



          }
        }
      }

    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;
