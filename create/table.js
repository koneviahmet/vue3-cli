const fs    = require('fs');
const _     = require('lodash');
const afs   = require('../afs.js');
const slash = require('slash');
var clc     = require("cli-color");

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
if(process.env.OS == "Windows_NT"){dir = slash(dir);}
dir = dir.replace("/create", "");

const pwd = process.env.PWD;

const sourceViews           = dir + '/copy/vue-cli/src/views/';
const sourceComponents      = dir + '/copy/vue-cli/src/components/';
const sourceRouter          = dir + '/copy/vue-cli/src/router/';
const sourceServices        = dir + '/copy/vue-cli/src/services/';
const sourceCompositions    = dir + '/copy/vue-cli/src/compositions/';

const copyViews           = pwd + '/src/views/';
const copyRouter          = pwd + '/src/router/';
const copyComponents      = pwd + '/src/components/';
const copyServices        = pwd + '/src/services/';
const copyCompositions    = pwd + '/src/compositions/';

// async/await
const createTable = async (table_name, secJson) => {
    try {
      //table_name => hepsi_kucuk

      /* baş harfi Büyük*/
      //const table_nameUF = _.upperFirst(table_name);
      const table_nameUF = table_name.charAt(0).toUpperCase() + table_name.slice(1);


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

      let src_durum  = await afs.isFile('src');
      if(!src_durum){
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
            console.log(clc.red("tablo hazırlanıyor..."));


            
            /* views */
            await afs.createPage(copyViews+'/'+table_name);
            const viewHome  = await afs.readFile(sourceViews + '/schema/Home.vue');
            const viewCreate  = await afs.readFile(sourceViews + '/schema/Create.vue');
            const viewDetail  = await afs.readFile(sourceViews + '/schema/Detail.vue');
            const viewList  = await afs.readFile(sourceViews + '/schema/List.vue');
            const viewSearch  = await afs.readFile(sourceViews + '/schema/Search.vue');
            const viewUpdate  = await afs.readFile(sourceViews + '/schema/Update.vue');


            let viewHomeR   = await afs.replaceFile(viewHome, 'schema', table_name);
                viewHomeR   = await afs.replaceFile(viewHomeR, 'Schema', table_nameUF);

            let viewCreateR   = await afs.replaceFile(viewCreate, 'schema', table_name);
                viewCreateR   = await afs.replaceFile(viewCreateR, 'Schema', table_nameUF);

            let viewDetailR   = await afs.replaceFile(viewDetail, 'schema', table_name);
                viewDetailR   = await afs.replaceFile(viewDetailR, 'Schema', table_nameUF);

            let viewListR   = await afs.replaceFile(viewList, 'schema', table_name);
                viewListR   = await afs.replaceFile(viewListR, 'Schema', table_nameUF);

            let viewSearchR   = await afs.replaceFile(viewSearch, 'schema', table_name);
                viewSearchR   = await afs.replaceFile(viewSearchR, 'Schema', table_nameUF);

            let viewUpdateR   = await afs.replaceFile(viewUpdate, 'schema', table_name);
                viewUpdateR   = await afs.replaceFile(viewUpdateR, 'Schema', table_nameUF);


            await writeFile(copyViews + table_name + '/Home.vue', viewHomeR);
            await writeFile(copyViews + table_name + '/Create.vue', viewCreateR);
            await writeFile(copyViews + table_name + '/Detail.vue', viewDetailR);
            await writeFile(copyViews + table_name + '/List.vue', viewListR);
            await writeFile(copyViews + table_name + '/Search.vue', viewSearchR);
            await writeFile(copyViews + table_name + '/Update.vue', viewUpdateR);



            /* components form */
            await afs.createPage(copyComponents+'content/'+table_name);
            await afs.createPage(copyComponents+'content/'+table_name + "/form");
            await afs.createPage(copyComponents+'content/'+table_name + "/menu");
            const componentFormCreate  = await afs.readFile(sourceComponents + 'content/schema/form/create.vue');
            const componentFormCreateValidate  = await afs.readFile(sourceComponents + 'content/schema/form/createValidate.js');
            const componentFormSearch  = await afs.readFile(sourceComponents + 'content/schema/form/search.vue');
            const componentFormSearchValidate  = await afs.readFile(sourceComponents + 'content/schema/form/searchValidate.js');
            const componentFormUpdate  = await afs.readFile(sourceComponents + 'content/schema/form/update.vue');
            const componentFormUpdateValidate  = await afs.readFile(sourceComponents + 'content/schema/form/updateValidate.js');


            let componentFormCreateR   = await afs.replaceFile(componentFormCreate, 'schema', table_name);
                componentFormCreateR   = await afs.replaceFile(componentFormCreateR, 'Schema', table_nameUF);

            let deneleteNline = await afs.replaceFile(componentFormCreateR, '\n', '');


            let ustArr = deneleteNline.matchAll(RegExp(/<!--form-->(.*?)<!--#form-->/, 'g'));
            console.log([...ustArr][0][0]);

            /*
            let componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidate, 'schema', table_name);
                componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidateR, 'Schema', table_nameUF);
            */


            //console.log("componentFormCreateValidateR", componentFormCreateValidateR);
            let validationString = "";
            let validationString2 = "";
            let validationString3 = "";
            secJson.map(i => {
              const iUF = i.charAt(0).toUpperCase() + i.slice(1);
              validationString += i+'Text: yup.string().required(),\n            ';
              validationString2 += i + 'Text,\n        ';
              validationString3 += "const { value: "+i+"Text, errorMessage: error"+iUF+"Text} = useField('"+i+"Text')\n    ";

            })

            let componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidate, "schemaText: yup.string\\(\\).required\\(\\),", validationString); 
            componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidateR, "const { value: schemaText, errorMessage: errorSchemaText} = useField\\('schemaText'\\)", validationString3);
            componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidateR, 'schemaText,', validationString2);
            componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidateR, 'errorSchemaText,', "");

            let componentFormSearchR   = await afs.replaceFile(componentFormSearch, 'schema', table_name);
                componentFormSearchR   = await afs.replaceFile(componentFormSearchR, 'Schema', table_nameUF);

            let componentFormSearchValidateR   = await afs.replaceFile(componentFormSearchValidate, 'schema', table_name);
                componentFormSearchValidateR   = await afs.replaceFile(componentFormSearchValidateR, 'Schema', table_nameUF);


            let componentFormUpdateR   = await afs.replaceFile(componentFormUpdate, 'schema', table_name);
                componentFormUpdateR   = await afs.replaceFile(componentFormUpdateR, 'Schema', table_nameUF);



            let componentFormUpdateValidateR   = await afs.replaceFile(componentFormUpdateValidate, "schemaText: yup.string\\(\\).required\\(\\),", validationString); 
              componentFormUpdateValidateR   = await afs.replaceFile(componentFormUpdateValidateR, "const { value: schemaText, errorMessage: errorSchemaText} = useField\\('schemaText'\\)", validationString3);
              componentFormUpdateValidateR   = await afs.replaceFile(componentFormUpdateValidateR, 'schemaText,', validationString2);
              componentFormUpdateValidateR   = await afs.replaceFile(componentFormUpdateValidateR, 'errorSchemaText,', "");


            await writeFile(copyComponents + "content/" + table_name + '/form/create.vue', componentFormCreateR);
            await writeFile(copyComponents + "content/" + table_name + '/form/createValidate.js', componentFormCreateValidateR);
            await writeFile(copyComponents + "content/" + table_name + '/form/search.vue', componentFormSearchR);
            await writeFile(copyComponents + "content/" + table_name + '/form/searchValidate.js', componentFormSearchValidateR);
            await writeFile(copyComponents + "content/" + table_name + '/form/update.vue', componentFormUpdateR);
            await writeFile(copyComponents + "content/" + table_name + '/form/updateValidate.js', componentFormUpdateValidateR);
            
            /* components menu */
            await afs.createPage(copyComponents+'content/'+table_name + "/menu");
            const componentMenuMain = await afs.readFile(sourceComponents + 'content/schema/menu/MainMenu.vue');

            let componentMenuMainR   = await afs.replaceFile(componentMenuMain, 'schema', table_name);
                componentMenuMainR   = await afs.replaceFile(componentMenuMainR, 'Schema', table_nameUF);

            await writeFile(copyComponents + "content/" + table_name + '/menu/MainMenu.vue', componentMenuMainR);


            //sourceComponents add menu item in header
            const headerMenu   = await afs.readFile(copyComponents + 'header/Header.vue');

            const headerMenuString = 'title: "Error" \n        },\n        {\n            to: "/'+table_name+'",\n            title: "'+table_nameUF+'"';
            let headerMenuR    = await afs.replaceFile(headerMenu, 'title: "Error"', headerMenuString);
            await writeFile(copyComponents + 'header/Header.vue', headerMenuR);
            

            /* compositions */
            const compositionsModel   = await afs.readFile(sourceCompositions + 'useModelSchema.js');
            let compositionsModelR    = await afs.replaceFile(compositionsModel, 'schema', table_name);
                compositionsModelR        = await afs.replaceFile(compositionsModelR, 'Schema', table_nameUF);


            await writeFile(copyCompositions + 'useModel'+table_nameUF+'.js', compositionsModelR);
         



            /* router */
            //await afs.copy_all_file(dir, '/copy/vue-cli/src/router/routers/schema.js', "src/router/routers/"+table_name+".js");
            const router   = await afs.readFile(sourceRouter + 'routers/schema.js');
            let routerR    = await afs.replaceFile(router, 'schema', table_name);
                routerR    = await afs.replaceFile(routerR, 'Schema', table_nameUF);

            await writeFile(copyRouter +"routers/"+table_name+'.js', routerR);

            //routerde düzenleme yapalım
            const routerIndex = await afs.readFile(copyRouter + 'index.js');

            const replaceImport = 'import { '+table_name+'Routers } from "./routers/'+table_name+'.js" \n//import';
            let routerIndexR    = await afs.replaceFile(routerIndex, '//import', replaceImport);
                
            //...homeRouters
            let replaceRouter = '...homeRouters,\n        ...'+table_name+'Routers,';
            routerIndexR    = await afs.replaceFile(routerIndexR, '...homeRouters,', replaceRouter);
            await writeFile(copyRouter + 'index.js', routerIndexR);


            /* services */
            //await afs.copy_all_file(dir, '/copy/vue-cli/src/services/SchemaServices.js', "src/services/"+table_nameUF+"Services.js");
            const services   = await afs.readFile(sourceServices + 'SchemaServices.js');
            let servicesR    = await afs.replaceFile(services, 'schema', table_name);
                servicesR    = await afs.replaceFile(servicesR, 'Schema', table_nameUF);

            await writeFile(copyServices +table_nameUF+'Services.js', servicesR);

 
            // db düzenlemesi yapalım
            const dbJson   = await afs.readFile(pwd + '/db/db.json'); 
            let dbJsonR    = await afs.replaceFile(dbJson, '"empty": \\[]', '"' + table_name + '": [], \n  "empty": []');
            await writeFile(pwd + '/db/db.json', dbJsonR);

            
            //add role
            const role   = await afs.readFile(pwd + '/src/utils/roles.js'); 
            const roleString = '"' + table_nameUF + 'Home": [2,3],\n' + 
                               '    "' + table_nameUF + 'Create": [1,2,3], \n' +
                               '    "' + table_nameUF + 'Update": [2,3], \n' +
                               '    "' + table_nameUF + 'Detail": [2,3], \n' +
                               '    "' + table_nameUF + 'List": [2,3], \n' +
                               '    "' + table_nameUF + 'Search": [2,3], \n' +
                               '    "empty": [],';
                               
                               
            let roleR    = await afs.replaceFile(role, '"empty": \\[]', roleString);
            await writeFile(pwd + '/src/utils/roles.js', roleR);
          
          }
        } 
      }

    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = createTable;
