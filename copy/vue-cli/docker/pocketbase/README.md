# PocketBase Docker Setup

Bu klasör, PocketBase'i Docker ortamında çalıştırmak için gerekli dosyaları içerir.

## İçerikler

- `Dockerfile`: PocketBase için temel Docker imajı
- `docker-compose.yml`: PocketBase ve gerekli servisleri çalıştırmak için docker-compose yapılandırması

## Kurulum ve Çalıştırma

### Ön Koşullar

- Docker ve Docker Compose yüklü olmalıdır.

### Adımlar

1. Bu klasöre gidin:

```bash
cd docker/pocketbase
```

2. Docker imajını oluşturun ve konteyner'ı başlatın:

```bash
docker-compose up -d
```

3. PocketBase'e erişin:

```
http://localhost:8090
```

4. Admin paneline erişmek için:

```
http://localhost:8090/_/
```

## Veri Kalıcılığı

PocketBase verileri Docker volume'unda (`pb_data`) saklanır. Bu, konteyneri silip yeniden oluşturduğunuzda verilerin korunmasını sağlar.

## Yapılandırma

- **Port**: Varsayılan olarak 8090 portunu kullanır. Bunu `docker-compose.yml` dosyasında değiştirebilirsiniz.
- **Versiyon**: Dockerfile'da PocketBase sürümünü değiştirebilirsiniz.

## Servisi Durdurma

```bash
docker-compose down
```

## Servisi Kaldırma (Verileri Silme)

```bash
docker-compose down -v
``` 