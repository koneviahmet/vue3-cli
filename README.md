# vue-cli
**vue-cli** **node.js** kullanılarak oluşturulmuş ve terminal aracılığı ile kullanılması amaçlanmıştır. Terminal kodlarını kullanarak vue3 alt yapısında hızlıca proje taslağı oluşturmanızı sağlar. 
Bunun için iki adet terminal komutu kullanır. 

> vue-cli --install <proje_adi>
> vue-cli --table <tablo_adi>

Help komutu kullanarak terminalde kullanabileceğimiz kodlara ve kullanımlarına erişebilirsiniz.

> vue-cli --help 

# Kurulumu

Öncelikle repoyu bilgisayarınızda daha sonra değiştirmeyeceğiniz bir dizine klonlayın. 

İlgili dizini seçtikten sonra aşağıdaki kodu kullanarak repoyu bilgisayarınıza klonlayabilirsiniz.

> git clone https://github.com/koneviahmet/vue3-cli.git

Klonlama bittikten sonra projenin kurulu olduğu dizine giriniz.

> cd vue3-cli
>
> npm i

npm i komutu ile projenin bağımlılıklarını kuruyoruz. vue-cli komutumuzun terminalde çalışabilmesi için repoyu globala kurmamız gerekiyor bunun içinde aşağıdaki kodları terminale giriyoruz.

> npm i -g

linux için

> sudo npm i -g 

Yukarıdaki komut ile beraber artık istedimiz dizinde **vue-cli** terminal koduna erişebiliriz.



# Örnek proje 

Projenin çalışma mantığını anlamak için basit bir film sitesi uygulaması yapalım. Backend kısmında sahte api çalıştırmak için 

**json-server** (https://github.com/typicode/json-server) reposunu kullanıyoruz.  Film sitesini oluşturduktan sonra backendimizin çalışması için json-serverın kutulması gerekmektedir. Kurulum için yukarıdaki linki ziyaret edebilirsiniz.



