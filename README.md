# DROBH AI Asistanı

Drobh markasının "Bold & Urban Coffee" felsefesiyle çalışan AI sohbet uygulaması. OpenAI GPT-3.5 ile kahve dünyası hakkında kapsamlı bilgi verir.

## 🚀 Özellikler

- **Drobh Marka Kimliği**: Cesur ve şehirli kahve deneyimi
- **Gerçek AI Sohbeti**: OpenAI GPT-3.5-turbo modeli kullanır
- **Kapsamlı Kahve Bilgisi**: Tüm kahve konularında uzman
- **Türkçe Destek**: Tamamen Türkçe arayüz ve yanıtlar
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Selamlama Desteği**: Merhaba, nasılsın gibi selamlamalara yanıt verir

## 🛠️ Teknolojiler

- **React 19** - Modern UI framework
- **TypeScript** - Tip güvenliği
- **OpenAI API** - GPT-3.5-turbo modeli
- **Axios** - HTTP istekleri
- **Lucide React** - İkonlar
- **React Router** - Client-side routing

## 📦 Kurulum

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Environment Variables
Proje klasöründe `.env` dosyası oluşturun:
```env
REACT_APP_OPENAI_API_KEY=sk-your-openai-api-key-here
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm start
```

## 🚀 Production Build

### 1. Build Edin
```bash
npm run build
```

### 2. Build Klasörü
Build işlemi sonrası `build` klasörü oluşur.

## 🌐 cPanel Deployment

### Alt Dizin Kurulumu: `/kahve-yapay-zeka`

#### 1. **cPanel File Manager**
- cPanel → File Manager
- `public_html` klasörüne gidin
- `kahve-yapay-zeka` klasörü oluşturun

#### 2. **Dosyaları Yükleyin**
- `build` klasöründeki **tüm dosyaları** seçin
- `kahve-yapay-zeka` klasörüne yükleyin

#### 3. **Dosya Yapısı**
```
public_html/
└── kahve-yapay-zeka/
    ├── index.html
    ├── static/
    ├── asset-manifest.json
    └── favicon.ico
```

#### 4. **Erişim URL'i**
```
https://habipbahceci.com/kahve-yapay-zeka
```

## 🔧 Konfigürasyon

### package.json Ayarları
```json
{
  "homepage": "/kahve-yapay-zeka"
}
```

### React Router Basename
```jsx
<BrowserRouter basename="/kahve-yapay-zeka">
```

### .htaccess Dosyası
- Client-side routing için gerekli
- SEO optimizasyonu
- Güvenlik başlıkları
- Gzip sıkıştırma

## 🎯 Kullanım

### Drobh Marka Konuları
- Kaldi's Gift Ethiopia
- Safari Brew Kenya
- Bold & Urban Coffee felsefesi
- Cesur demlenmeler

### Kahve Konuları
- Espresso, latte, cappuccino
- Demleme yöntemleri
- Çekirdek türleri (Arabica, Robusta, Liberica, Excelsa)
- Barista teknikleri
- Kahve kültürü ve tarihçesi
- Dünya kahve bölgeleri

### Selamlama Örnekleri
- "Merhaba"
- "Nasılsın?"
- "Teşekkür ederim"

### Örnek Sorular
- "Drobh'ın Kaldi's Gift ürünü hakkında bilgi ver"
- "Espresso nasıl yapılır?"
- "Kahve tarihçesi hakkında bilgi ver"
- "Arabica ve Robusta farkı nedir?"

## 🔒 Güvenlik

- API anahtarı environment variable'da
- HTTPS zorunlu
- Güvenlik başlıkları aktif
- XSS koruması

## 📱 Responsive Tasarım

- Mobil uyumlu
- Tablet optimizasyonu
- Masaüstü deneyimi
- Touch-friendly arayüz

## 🚨 Hata Yönetimi

- API hatalarında fallback yanıtlar
- Kullanıcı dostu hata mesajları
- Otomatik yeniden deneme
- Loading durumları

## 📈 Performans

- Lazy loading
- Gzip sıkıştırma
- Cache optimizasyonu
- CDN desteği

## 🔄 Güncelleme

### Yeni Build Yükleme
1. `npm run build`
2. `build` klasörünü yedekleyin
3. Eski dosyaları silin
4. Yeni dosyaları yükleyin

### Environment Variables
- `.env` dosyasını güncelleyin
- Yeni build oluşturun
- Sunucuya yükleyin

## 📞 Destek

Sorun yaşarsanız:
1. Console loglarını kontrol edin
2. Network sekmesini inceleyin
3. API anahtarınızı doğrulayın
4. Sunucu loglarını kontrol edin

---

**DROBH AI Asistanı** - Bold & Urban Coffee deneyimi ile OpenAI GPT-3.5
