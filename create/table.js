const fs    = require('fs');
const afs   = require('../afs.js');
const slash = require('slash');
var clc     = require("cli-color");

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
if(process.env.OS == "Windows_NT"){dir = slash(dir);}
dir = dir.replace("/create", "");

const pwd = process.env.PWD;

const sourceViews           = dir + '/copy/vue-cli/src/views/';
const sourceComponents      = dir + '/copy/vue-cli/src/views/';
const sourceRouter          = dir + '/copy/vue-cli/src/router/';
const sourceServices        = dir + '/copy/vue-cli/src/services/';
const sourceCompositions    = dir + '/copy/vue-cli/src/compositions/';

const copyViews           = pwd + '/src/views/';
const copyRouter          = pwd + '/src/router/';
const copyComponents      = pwd + '/src/views/';
const copyGlobalComponents= pwd + '/src/components/';
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
          //if(model_durum && 1==2){
          if(model_durum){
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
            await afs.createPage(copyComponents + table_name + "/components");
            await afs.createPage(copyComponents + table_name + "/components/form");
            await afs.createPage(copyComponents + table_name + "/components/menu");
            const componentFormCreate  = await afs.readFile(sourceComponents + 'schema/components/form/create.vue');
            const componentFormCreateValidate  = await afs.readFile(sourceComponents + 'schema/components/form/createValidate.js');
            const componentFormSearch  = await afs.readFile(sourceComponents + 'schema/components/form/search.vue');
            const componentFormSearchValidate  = await afs.readFile(sourceComponents + 'schema/components/form/searchValidate.js');
            const componentFormUpdate  = await afs.readFile(sourceComponents + 'schema/components/form/update.vue');
            const componentFormUpdateValidate  = await afs.readFile(sourceComponents + 'schema/components/form/updateValidate.js');

            let secJsonFirstUF = secJson[0].charAt(0).toUpperCase() + secJson[0].slice(1);
            let componentFormCreateR   = await afs.replaceFile(componentFormCreate, 'Schema Text', secJson[0]);  
                            
                componentFormCreateR   = await afs.replaceFile(componentFormCreateR, 'schemaText', secJson[0]);  
                componentFormCreateR   = await afs.replaceFile(componentFormCreateR, 'errorSchemaText', "error"+secJsonFirstUF);  


                componentFormCreateR   = await afs.replaceFile(componentFormCreateR, 'schema', table_name);
                componentFormCreateR   = await afs.replaceFile(componentFormCreateR, 'Schema', table_nameUF);



            let removeLn = await afs.replaceFile(componentFormCreate, '\n', '');
            let ustArr = removeLn.matchAll(RegExp(/<!--form-->(.*?)<!--#form-->/, 'g'));
            let formItem = [...ustArr][0][0];

            
            
            if (secJson.length > 1){
              let formString = "";
              secJson.slice(1).map(async i => {
                const iUF = i.charAt(0).toUpperCase() + i.slice(1);
                let currentForm = formItem;
                let currentFormR   = await afs.replaceFile(currentForm, 'Schema Text', i);    
                currentFormR   = await afs.replaceFile(currentFormR, 'schemaText', i);  
                currentFormR   = await afs.replaceFile(currentFormR, 'errorSchemaText', "error"+iUF);  

                formString += currentFormR;
                formString += "\n\n";

                componentFormCreateR  = await afs.replaceFile(componentFormCreateR, '<!--add-->', formString);
              })
            }


            //console.log("componentFormCreateValidateR", componentFormCreateValidateR);
            let validationString = "";
            let validationString2 = "";
            let validationString3 = "";
            let validationString4 = "";
            secJson.map(i => {
              const iUF = i.charAt(0).toUpperCase() + i.slice(1);
              validationString += i+': yup.string().required(),\n            ';
              validationString2 += i + ',\n        ';
              validationString4 += 'error'+iUF + ',\n        ';
              validationString3 += "const { value: "+i+", errorMessage: error"+iUF+"} = useField('"+i+"')\n    ";

            })

            let componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidate, "schemaText: yup.string\\(\\).required\\(\\),", validationString); 
            componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidateR, "const { value: schemaText, errorMessage: errorSchemaText} = useField\\('schemaText'\\)", validationString3);
            componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidateR, 'schemaText,', validationString2);
            componentFormCreateValidateR   = await afs.replaceFile(componentFormCreateValidateR, 'errorSchemaText,', validationString4);



            let componentFormSearchR   = await afs.replaceFile(componentFormSearch, 'schema', table_name);
                componentFormSearchR   = await afs.replaceFile(componentFormSearchR, 'Schema', table_nameUF);

            let componentFormSearchValidateR   = await afs.replaceFile(componentFormSearchValidate, 'schema', table_name);
                componentFormSearchValidateR   = await afs.replaceFile(componentFormSearchValidateR, 'Schema', table_nameUF);


            let componentFormUpdateR   = await afs.replaceFile(componentFormUpdate, 'Schema Text', secJson[0]);  
                        
            let valueUpdateString = "";
            secJson.map(i => {
              valueUpdateString += "values."+i+" = response."+i+" \n              ";
            })

            componentFormUpdateR  = await afs.replaceFile(componentFormUpdateR, 'values.schemaText = response.schemaText', valueUpdateString);
            componentFormUpdateR   = await afs.replaceFile(componentFormUpdateR, 'schemaText', secJson[0]);  
            componentFormUpdateR   = await afs.replaceFile(componentFormUpdateR, 'errorSchemaText', "error"+secJsonFirstUF);  
            componentFormUpdateR   = await afs.replaceFile(componentFormUpdateR, 'schema', table_name);
            componentFormUpdateR   = await afs.replaceFile(componentFormUpdateR, 'Schema', table_nameUF);

            let removeUpLn = await afs.replaceFile(componentFormUpdate, '\n', '');
            let ustUpdArr = removeUpLn.matchAll(RegExp(/<!--form-->(.*?)<!--#form-->/, 'g'));
            let formItemUpdate = [...ustUpdArr][0][0];

            if (secJson.length > 1){
              let formString = "";
              secJson.slice(1).map(async i => {
                const iUF = i.charAt(0).toUpperCase() + i.slice(1);
                let currentForm = formItemUpdate;
                let currentFormR   = await afs.replaceFile(currentForm, 'Schema Text', i);    
                currentFormR   = await afs.replaceFile(currentFormR, 'schemaText', i);  
                currentFormR   = await afs.replaceFile(currentFormR, 'errorSchemaText', "error"+iUF);  

                formString += currentFormR;
                formString += "\n\n";

                componentFormUpdateR  = await afs.replaceFile(componentFormUpdateR, '<!--add-->', formString);
              })
            }


            let componentFormUpdateValidateR   = await afs.replaceFile(componentFormUpdateValidate, "schemaText: yup.string\\(\\).required\\(\\),", validationString); 
              componentFormUpdateValidateR   = await afs.replaceFile(componentFormUpdateValidateR, "const { value: schemaText, errorMessage: errorSchemaText} = useField\\('schemaText'\\)", validationString3);
              componentFormUpdateValidateR   = await afs.replaceFile(componentFormUpdateValidateR, 'schemaText,', validationString2);
              componentFormUpdateValidateR   = await afs.replaceFile(componentFormUpdateValidateR, 'errorSchemaText,', validationString4);
              



            await writeFile(copyComponents  + table_name + '/components/form/create.vue', componentFormCreateR);
            await writeFile(copyComponents  + table_name + '/components/form/createValidate.js', componentFormCreateValidateR);
            await writeFile(copyComponents  + table_name + '/components/form/search.vue', componentFormSearchR);
            await writeFile(copyComponents  + table_name + '/components/form/searchValidate.js', componentFormSearchValidateR);
            await writeFile(copyComponents  + table_name + '/components/form/update.vue', componentFormUpdateR);
            await writeFile(copyComponents  + table_name + '/components/form/updateValidate.js', componentFormUpdateValidateR);
            
            /* components menu */
            await afs.createPage(copyComponents + table_name + "/components/menu");
            const componentMenuMain = await afs.readFile(sourceComponents + 'schema/components/menu/MainMenu.vue');

            let componentMenuMainR   = await afs.replaceFile(componentMenuMain, 'schema', table_name);
                componentMenuMainR   = await afs.replaceFile(componentMenuMainR, 'Schema', table_nameUF);

            await writeFile(copyComponents + table_name + '/components/menu/MainMenu.vue', componentMenuMainR);


            //sourceComponents add menu item in header
            const headerMenu   = await afs.readFile(copyGlobalComponents + 'menu/Menu.vue');

            const headerMenuString = 'title: "Error" \n        },\n        {\n            to: "/'+table_name+'",\n            title: "'+table_nameUF+'"';
            let headerMenuR    = await afs.replaceFile(headerMenu, 'title: "Error"', headerMenuString);
            await writeFile(copyGlobalComponents + 'menu/Menu.vue', headerMenuR);
            

            /* compositions */
            const compositionsModel   = await afs.readFile(sourceCompositions + 'useModelSchema.js');
            let compositionsModelR    = await afs.replaceFile(compositionsModel, 'schema', table_name);
                compositionsModelR        = await afs.replaceFile(compositionsModelR, 'Schema', table_nameUF);


            await writeFile(copyCompositions + 'useModel'+table_nameUF+'.js', compositionsModelR);
         



            /* router */
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
            const roleString = '' + table_nameUF + 'Home: [2, 3],\n' + 
                               '  ' + table_nameUF + 'Create: [1, 2, 3], \n' +
                               '  ' + table_nameUF + 'Update: [2, 3], \n' +
                               '  ' + table_nameUF + 'Detail: [2, 3], \n' +
                               '  ' + table_nameUF + 'List: [2, 3], \n' +
                               '  ' + table_nameUF + 'Search: [2, 3], \n' +
                               '  empty: []';
                               
                               
            let roleR    = await afs.replaceFile(role, 'empty: \\[]', roleString);
            await writeFile(pwd + '/src/utils/roles.js', roleR);


            //edit store
            const store   = await afs.readFile(pwd + '/src/store/index.js'); 
            const storeString = 'schema: \[], \n ' + table_name + ': \[],';
            let newStore  = await afs.replaceFile(store, 'schema: \\[],', storeString);
            

            const storeString2 = '_get'+table_nameUF+': (state) => state?.'+table_name+', \n _getSchema';
            newStore  = await afs.replaceFile(newStore, '_getSchema', storeString2);
            
            const storeString3 = 'add'+table_nameUF+'(state, '+table_name+') { \n state.'+table_name+' = [...'+table_name+']; \n}, \n addSchema';
            newStore  = await afs.replaceFile(newStore, 'addSchema', storeString3);

            await writeFile(pwd + '/src/store/index.js', newStore);

          }
        } 
      }

    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = createTable;
