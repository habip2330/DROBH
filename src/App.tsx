import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Coffee, AlertCircle } from 'lucide-react';
import './App.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey] = useState(process.env.REACT_APP_OPENAI_API_KEY || '');
  const [appLoaded, setAppLoaded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('Drobh AI Asistanı yüklendi');
  }, []);

  const isDrobhRelated = (text: string): boolean => {
    const drobhKeywords = [
      // Selamlamalar ve genel konuşma
      'merhaba', 'selam', 'selamlar', 'hey', 'hi', 'hello', 'günaydın', 'iyi günler', 'iyi akşamlar', 'iyi geceler',
      'nasılsın', 'nasılsınız', 'naber', 'ne haber', 'teşekkür', 'teşekkürler', 'sağol', 'sağolun', 'rica', 'bir şey değil',
      'evet', 'hayır', 'tamam', 'olur', 'peki', 'tabii', 'elbette', 'kesinlikle', 'emin', 'şüphe', 'belki',
      
      // Drobh ve kahve anahtar kelimeleri
      'drobh', 'kahve', 'coffee', 'espresso', 'latte', 'cappuccino', 'americano', 'mocha',
      'macchiato', 'ristretto', 'lungo', 'flat white', 'cortado', 'piccolo',
      'arabica', 'robusta', 'çekirdek', 'bean', 'çekme', 'grind', 'demleme',
      'brewing', 'filtre', 'filter', 'french press', 'aeropress', 'chemex',
      'v60', 'kalita', 'moka pot', 'ibrik', 'türk kahvesi', 'turkish coffee',
      'soğuk', 'cold', 'sıcak', 'hot', 'süt', 'milk', 'şeker', 'sugar',
      'krem', 'cream', 'köpük', 'foam', 'barista', 'kahvehane', 'cafe',
      'kahve makinesi', 'coffee machine', 'değirmen', 'grinder', 'roaster',
      'kavurma', 'roasting', 'çekirdek', 'bean', 'çiçek', 'flower', 'meyve',
      'fruit', 'asidite', 'acidity', 'gövde', 'body', 'aroma', 'tat', 'taste',
      'bitter', 'acı', 'tatlı', 'sweet', 'ekşi', 'sour', 'umami', 'umami',
      'kafein', 'caffeine', 'kavurma', 'roasting', 'light', 'orta', 'medium',
      'dark', 'koyu', 'hafif', 'light', 'orta', 'medium', 'koyu', 'dark',
      'single origin', 'blend', 'karışım', 'çiftlik', 'farm', 'bölge', 'region',
      'ülke', 'country', 'yükseklik', 'altitude', 'iklim', 'climate', 'toprak',
      'soil', 'işleme', 'processing', 'yıkanmış', 'washed', 'doğal', 'natural',
      'honey', 'bal', 'fermentasyon', 'fermentation', 'kurutma', 'drying',
      'kaldi', 'ethiopia', 'safari', 'kenya', 'gift', 'brew', 'urban', 'bold',
      'cesaret', 'cesur', 'ritim', 'kalabalık', 'sıradan', 'anlar', 'başlangıç',
      'demleme', 'fincan', 'sipariş', 'ürün', 'product', 'satın al', 'buy',
      'fiyat', 'price', 'kampanya', 'promotion', 'indirim', 'discount',
      'kargo', 'shipping', 'teslimat', 'delivery', 'ödeme', 'payment',
      'kredi kartı', 'credit card', 'havale', 'transfer', 'iade', 'return',
      'değişim', 'exchange', 'garanti', 'warranty', 'müşteri', 'customer',
      'hizmet', 'service', 'destek', 'support', 'yardım', 'help',
      // Kahve tarihçesi ve kültürü
      'tarih', 'history', 'kültür', 'culture', 'gelenek', 'tradition',
      'efsane', 'legend', 'keşif', 'discovery', 'yemen', 'ethiopia',
      'arabia', 'istanbul', 'vienna', 'venice', 'paris', 'london',
      'new york', 'seattle', 'portland', 'melbourne', 'tokyo',
      'kahve çekirdeği', 'coffee cherry', 'kahve meyvesi', 'coffee fruit',
      'kahve ağacı', 'coffee tree', 'kahve bitkisi', 'coffee plant',
      'kahve çiçeği', 'coffee flower', 'kahve yaprağı', 'coffee leaf',
      'kahve kökü', 'coffee root', 'kahve dalı', 'coffee branch',
      // Kahve çeşitleri ve türleri
      'liberica', 'excelsa', 'maragogype', 'pacamara', 'geisha',
      'bourbon', 'typica', 'caturra', 'catuai', 'mundo novo',
      'yellow bourbon', 'red bourbon', 'orange bourbon',
      'blue mountain', 'kona', 'sumatra', 'java', 'sulawesi',
      'papua new guinea', 'guatemala', 'honduras', 'nicaragua',
      'costa rica', 'panama', 'colombia', 'brazil', 'peru',
      'ecuador', 'bolivia', 'chile', 'argentina', 'paraguay',
      'uruguay', 'venezuela', 'guyana', 'suriname', 'french guiana',
      // Demleme yöntemleri
      'pour over', 'drip', 'siphon', 'vacuum pot', 'percolator',
      'moka', 'brikka', 'neapolitan', 'charlotte', 'clever dripper',
      'kalita wave', 'bee house', 'melitta', 'bonmac', 'kone',
      'gold tone', 'metal filter', 'cloth filter', 'paper filter',
      'bamboo filter', 'ceramic filter', 'glass filter',
      // Kahve ekipmanları
      'tamper', 'portafilter', 'group head', 'boiler', 'steam wand',
      'frother', 'milk jug', 'pitcher', 'scale', 'timer', 'thermometer',
      'water kettle', 'gooseneck', 'electric kettle', 'stovetop kettle',
      'coffee scoop', 'measuring spoon', 'coffee scale', 'digital scale',
      'burr grinder', 'blade grinder', 'hand grinder', 'electric grinder',
      // Kahve terimleri
      'crema', 'bloom', 'extraction', 'over extraction', 'under extraction',
      'channeling', 'tamping', 'distribution', 'leveling', 'polishing',
      'pre infusion', 'pressure profiling', 'temperature control',
      'grind size', 'particle size', 'uniformity', 'consistency',
      'dose', 'yield', 'ratio', 'strength', 'concentration',
      // Kahve sağlığı ve bilim
      'antioxidant', 'polyphenol', 'chlorogenic acid', 'caffeic acid',
      'quinic acid', 'trigonelline', 'niacin', 'vitamin b3',
      'metabolism', 'energy', 'focus', 'concentration', 'alertness',
      'sleep', 'insomnia', 'anxiety', 'stress', 'blood pressure',
      'heart rate', 'diabetes', 'liver', 'cancer', 'alzheimer',
      'parkinson', 'dementia', 'memory', 'cognitive function',
      // Kahve endüstrisi
      'fair trade', 'organic', 'rainforest alliance', 'utz certified',
      'direct trade', 'relationship coffee', 'microlot', 'single estate',
      'cooperative', 'farmer', 'producer', 'importer', 'exporter',
      'roaster', 'roastery', 'cafe', 'coffee shop', 'coffee house',
      'coffee bar', 'coffee stand', 'coffee cart', 'coffee truck',
      'coffee roaster', 'coffee trader', 'coffee broker', 'coffee consultant',
      'coffee trainer', 'coffee judge', 'coffee competition', 'barista championship',
      'world barista championship', 'world brewers cup', 'world latte art championship'
    ];

    const lowerText = text.toLowerCase();
    return drobhKeywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      throw new Error('API anahtarı gerekli');
    }

    try {
      console.log('Drobh AI Asistanı - OpenAI API çağrısı yapılıyor...');
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
                          {
                role: 'system',
                content: `Sen Drobh markasının resmi AI asistanısın. Drobh, "Bold & Urban Coffee" sloganıyla cesur ve şehirli kahve deneyimi sunan bir markadır.

MARKA FELSEFESİ:
- "Sıradan anlara cesaret katmak için var"
- "Cesur başlangıçlar, cesur demlenmelerden doğar"
- "Kalabalığın içinde kendine alan açanlara"
- "Aceleyle değil ritimle yürüyenlere"
- "Her sabah yeniden başlamaktan çekinmeyenlere"

ÜRÜNLER:
- Kaldi's Gift | Ethiopia | 001
- Safari Brew | Kenya | 002
- Ve diğer özel kahve çeşitleri

GÖREVİN:
1. Drobh markası ve ürünleri hakkında detaylı bilgi ver
2. Kahve ile ilgili TÜM konularda kapsamlı yanıt ver:
   - Kahve tarihçesi ve kültürü
   - Kahve çeşitleri ve türleri (Arabica, Robusta, Liberica, Excelsa)
   - Demleme yöntemleri (Espresso, Pour-over, French Press, vb.)
   - Kahve ekipmanları ve makinalar
   - Barista teknikleri ve latte art
   - Kahve sağlığı ve bilimsel bilgiler
   - Kahve endüstrisi ve sertifikasyon
   - Dünya kahve bölgeleri ve ülkeleri
   - Kahve çekirdekleri ve kavurma
   - Kahve aromaları ve tat profilleri
3. Müşteri hizmetleri desteği sağla
4. Sipariş ve ödeme konularında yardım et
5. Marka felsefesini yansıt

TON:
- Samimi ama profesyonel
- Cesur ve enerjik
- Şehirli ve modern
- Türkçe yanıt ver
- Drobh markasının değerlerini yansıt
- Kahve konusunda uzman ve bilgilendirici

Eğer soru Drobh veya kahve ile ilgili değilse, nazikçe sadece bu konularda yardım edebileceğini belirt. Kahve ile ilgili her türlü soruyu detaylı ve bilgilendirici şekilde yanıtla.`
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 400,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      console.log('Drobh AI Asistanı - OpenAI API yanıtı başarılı');
      
      if (response.data && response.data.choices && response.data.choices[0]) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error('API yanıtı boş geldi');
      }
    } catch (error: any) {
      console.error('Drobh AI Asistanı - OpenAI API hatası:', error);
      
      // API hatası durumunda Drobh'a özel yanıt sistemi
      const drobhResponses = [
        // Selamlama yanıtları
        "Merhaba! Drobh'ın 'Bold & Urban Coffee' deneyimine hoş geldiniz! Size nasıl yardımcı olabilirim?",
        "Selamlar! Cesur ve şehirli kahve tutkunları için buradayız. Hangi konuda bilgi almak istiyorsunuz?",
        "Hey! Drobh olarak sıradan anlara cesaret katmaya hazırız. Kahve dünyası hakkında ne öğrenmek istiyorsunuz?",
        "Günaydın! Drobh'ın cesur demlenmeleri hakkında konuşmaya başlayalım. Hangi konuda yardıma ihtiyacınız var?",
        "Merhaba! Drobh'ın ritimle yürüyen felsefesiyle, her sabah yeniden başlamaktan çekinmeyenlere özel kahve deneyimi sunuyoruz. Size nasıl yardımcı olabilirim?",
        
        // Drobh marka yanıtları
        "Drobh olarak size yardımcı olmaktan mutluluk duyarım! Cesur ve şehirli kahve deneyimimiz hakkında sorularınızı yanıtlayabilirim.",
        "Drobh'ın 'Bold & Urban Coffee' felsefesiyle, sıradan anlara cesaret katıyoruz. Hangi ürünümüz hakkında bilgi almak istiyorsunuz?",
        "Kaldi's Gift Ethiopia veya Safari Brew Kenya gibi özel kahve çeşitlerimiz hakkında detaylı bilgi verebilirim. Hangi konuda yardıma ihtiyacınız var?",
        "Drobh'ın cesur demlenmeleri hakkında konuşmak her zaman keyifli! Hangi kahve türümüz hakkında daha detaylı bilgi almak istiyorsunuz?",
        "Şehirli kahve deneyimimiz hakkında size rehberlik edebilirim. Espresso, latte, cappuccino veya özel çeşitlerimizden hangisi ilginizi çekiyor?",
        "Drobh'ın ritimle yürüyen felsefesiyle, her sabah yeniden başlamaktan çekinmeyenlere özel kahve deneyimi sunuyoruz. Hangi konuda yardıma ihtiyacınız var?",
        "Cesur başlangıçlar için cesur demlenmeler! Drobh'ın özel kahve çeşitleri ve demleme yöntemleri hakkında size bilgi verebilirim.",
        "Kalabalığın içinde kendine alan açanlara özel Drobh deneyimi! Hangi kahve türümüz hakkında bilgi almak istiyorsunuz?",
        "Drobh'ın 'Bold & Urban Coffee' koleksiyonundan hangi ürün hakkında bilgi almak istiyorsunuz? Kaldi's Gift, Safari Brew veya diğer özel çeşitlerimiz.",
        "Sıradan anlara cesaret katmak için var olan Drobh! Kahve çeşitlerimiz, demleme yöntemleri veya sipariş konularında size yardımcı olabilirim.",
        "Drobh'ın şehirli kahve deneyimi hakkında konuşalım! Hangi konuda bilgi almak istiyorsunuz?",
        "Cesur demlenmeler için Drobh! Ürünlerimiz, fiyatlarımız veya sipariş sürecimiz hakkında size yardımcı olabilirim.",
        "Drobh'ın ritimle yürüyen felsefesiyle, her gün yeniden başlamaktan çekinmeyenlere özel kahve deneyimi! Hangi konuda yardıma ihtiyacınız var?",
        "Bold & Urban Coffee deneyimi için Drobh! Kahve çeşitlerimiz, kampanyalarımız veya müşteri hizmetlerimiz hakkında bilgi verebilirim.",
        "Drobh'ın cesur başlangıçlar felsefesiyle, sıradan anlara cesaret katıyoruz! Hangi konuda size yardımcı olabilirim?",
        // Kahve bilgisi yanıtları
        "Kahve dünyası hakkında size yardımcı olmaktan mutluluk duyarım! Kahve tarihçesi, çeşitleri, demleme yöntemleri veya Drobh ürünlerimiz hakkında sorularınızı yanıtlayabilirim.",
        "Kahve konusunda uzmanım! Arabica, Robusta, Liberica, Excelsa çeşitleri, demleme yöntemleri, barista teknikleri veya Drobh'ın özel kahve deneyimi hakkında bilgi verebilirim.",
        "Kahve kültürü ve bilimi hakkında konuşalım! Kahve çekirdekleri, kavurma, aromalar, sağlık etkileri veya Drobh'ın cesur demlenmeleri hakkında size rehberlik edebilirim.",
        "Kahve endüstrisi ve dünya kahve bölgeleri hakkında bilgi verebilirim! Ethiopia, Kenya, Colombia, Brazil gibi ülkelerin kahve kültürleri veya Drobh'ın özel çeşitleri hakkında konuşabiliriz.",
        "Kahve ekipmanları ve makinalar hakkında size yardımcı olabilirim! Espresso makinesi, değirmen, French Press, Pour-over veya Drobh'ın önerdiği demleme yöntemleri hakkında bilgi verebilirim."
      ];
      
      const lowerMessage = userMessage.toLowerCase();
      let selectedResponse = drobhResponses[0];
      
      if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam') || lowerMessage.includes('hey') || lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('günaydın')) {
        selectedResponse = "Merhaba! Drobh'ın 'Bold & Urban Coffee' deneyimine hoş geldiniz! Cesur ve şehirli kahve tutkunları için buradayız. Size nasıl yardımcı olabilirim?";
      } else if (lowerMessage.includes('nasılsın') || lowerMessage.includes('nasılsınız') || lowerMessage.includes('naber') || lowerMessage.includes('ne haber')) {
        selectedResponse = "Teşekkür ederim, harika! Drobh olarak sıradan anlara cesaret katmaya devam ediyoruz. Siz nasılsınız? Kahve dünyası hakkında ne öğrenmek istiyorsunuz?";
      } else if (lowerMessage.includes('teşekkür') || lowerMessage.includes('sağol') || lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
        selectedResponse = "Rica ederim! Drobh'ın cesur demlenmeleri hakkında konuşmak her zaman keyifli. Başka nasıl yardımcı olabilirim?";
      } else if (lowerMessage.includes('kaldi') || lowerMessage.includes('ethiopia')) {
        selectedResponse = "Kaldi's Gift Ethiopia, Drobh'ın özel çeşitlerinden biridir. Bu cesur demleme, Ethiopia'nın zengin aromalarını yansıtır. Detaylı bilgi için ürün sayfamızı ziyaret edebilirsiniz.";
      } else if (lowerMessage.includes('safari') || lowerMessage.includes('kenya')) {
        selectedResponse = "Safari Brew Kenya, Drobh'ın şehirli kahve deneyiminin bir parçasıdır. Kenya'nın cesur aromalarını yansıtan bu özel çeşit hakkında detaylı bilgi verebilirim.";
      } else if (lowerMessage.includes('sipariş') || lowerMessage.includes('satın al') || lowerMessage.includes('buy')) {
        selectedResponse = "Drobh ürünlerini satın almak için web sitemizi ziyaret edebilir veya müşteri hizmetlerimizle iletişime geçebilirsiniz. Size en uygun ödeme seçeneklerini sunuyoruz.";
      } else if (lowerMessage.includes('fiyat') || lowerMessage.includes('price')) {
        selectedResponse = "Drobh ürünlerimizin güncel fiyatları için web sitemizi ziyaret edebilirsiniz. Özel kampanyalarımız ve indirimlerimiz hakkında da bilgi verebilirim.";
      } else if (lowerMessage.includes('kargo') || lowerMessage.includes('teslimat') || lowerMessage.includes('shipping')) {
        selectedResponse = "Drobh olarak hızlı ve güvenli teslimat hizmeti sunuyoruz. Kargo süreleri ve teslimat seçenekleri hakkında detaylı bilgi verebilirim.";
      } else {
        const randomIndex = Math.floor(Math.random() * drobhResponses.length);
        selectedResponse = drobhResponses[randomIndex];
      }
      
      return selectedResponse;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    
    if (!isDrobhRelated(userMessage)) {
      const warningMessage: Message = {
        id: Date.now().toString(),
        text: "Üzgünüm, sadece Drobh markası ve kahve ile ilgili sorulara cevap verebilirim. Lütfen Drobh ürünleri, kahve çeşitleri, sipariş veya müşteri hizmetleri konularında soru sorun.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, warningMessage]);
      setInputText('');
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await generateResponse(userMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error.message || "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin veya müşteri hizmetlerimizle iletişime geçin.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!appLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Drobh AI Asistanı</h1>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <Coffee className="coffee-icon" />
            <h1>Drobh AI Asistanı</h1>
          </div>
          <p className="header-subtitle">Bold & Urban Coffee Deneyimi</p>
        </div>

        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <Coffee className="welcome-icon" />
              <h2>Drobh'a Hoş Geldiniz!</h2>
              <p>Cesur başlangıçlar, cesur demlenmelerden doğar. Drobh'ın "Bold & Urban Coffee" deneyimi hakkında sorularınızı yanıtlayabilirim.</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-content">
                {!message.isUser && <Coffee className="ai-avatar" />}
                <div className="message-text">
                  {message.text}
                </div>
                {message.isUser && <div className="user-avatar">S</div>}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString('tr-TR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message ai-message">
              <div className="message-content">
                <Coffee className="ai-avatar" />
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Drobh ürünleri, kahve çeşitleri veya sipariş hakkında sorunuzu yazın..."
              rows={1}
              className="message-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="send-button"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="input-hint">
            <AlertCircle size={16} />
            <span>Sadece Drobh markası ve kahve ile ilgili sorular sorabilirsiniz</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;