import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, MapPin, Shield, Users, Award, Heart, Stethoscope, Eye, Scissors, Smile } from 'lucide-react';
import { supabase, VacationStatus } from './lib/supabase';
import { VacationBanner } from './components/VacationBanner';

function App() {
  const [vacationStatus, setVacationStatus] = useState<VacationStatus | null>(null);

  useEffect(() => {
    fetchVacationStatus();
  }, []);

  const fetchVacationStatus = async () => {
    const { data } = await supabase
      .from('vacation_status')
      .select('*')
      .single();
    
    if (data) {
      setVacationStatus(data);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-blue-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8" />
            <h1 className="text-2xl font-serif font-bold">MUDr. Ondřej Vácha</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#o-nas" className="hover:text-blue-200 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-200 after:transition-all after:duration-200 hover:after:w-full">O nás</a>
            <a href="#sluzby" className="hover:text-blue-200 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-200 after:transition-all after:duration-200 hover:after:w-full">Služby</a>
            <a href="#pacienti" className="hover:text-blue-200 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-200 after:transition-all after:duration-200 hover:after:w-full">Pro pacienty</a>
            <a href="#kontakt" className="hover:text-blue-200 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-200 after:transition-all after:duration-200 hover:after:w-full">Kontakt</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <VacationBanner vacationStatus={vacationStatus} />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Důvěryhodná péče pro celou rodinu
            </h2>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Více než 20 let zkušeností v oblasti zubního lékařství. Budujeme dlouhodobé vztahy založené na důvěře, profesionalitě a individuálním přístupu ke každému pacientovi.
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src="https://i.postimg.cc/yYQpCGB0/u8512965845-a-dentist-in-a-dental-ordination-wearing-navy-blue-23b0b0b5-7b8d-4418-adfc-4e81f4230a23.png" 
              alt="MUDr. Ondřej Vácha" 
              className="rounded-lg shadow-2xl w-full max-w-md h-80 object-cover transition-all duration-300 hover:shadow-3xl"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-nas" className="py-20 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://i.postimg.cc/MZdJXdxr/u8512965845-Ultra-realistic-photograph-of-a-dental-clinic-int-7de26be0-fed5-48c5-8a24-3893945f1324-0.png" 
                alt="Zubní ordinace MUDr. Ondřej Vácha" 
                className="rounded-lg shadow-lg w-full max-w-md h-96 object-cover object-top mx-auto transition-all duration-300 hover:shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-3xl font-serif font-bold text-blue-900 mb-6">MUDr. Ondřej Vácha</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Absolvent Lékařské fakulty Univerzity Karlovy v Praze s více než 20letou praxí v oboru zubního lékařství. Specializuji se na konzervační zubní lékařství, endodoncii a estetickou stomatologii.
                </p>
                <p>
                  Během své kariéry jsem se kontinuálně vzdělával a absolvoval četné odborné kurzy zaměřené na nejmodernější metody léčby. Mým cílem je poskytovat pacientům špičkovou péči s důrazem na prevenci a zachování přirozené krásy úsměvu.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-blue-50">
                    <Award className="h-5 w-5 text-blue-900" />
                    <span className="text-sm font-medium">20+ let praxe</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-blue-50">
                    <Users className="h-5 w-5 text-blue-900" />
                    <span className="text-sm font-medium">2000+ spokojených pacientů</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-serif font-bold text-blue-900 text-center mb-12">Naše služby</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-white group">
              <Shield className="h-8 w-8 text-blue-900 mb-4 transition-colors duration-200 group-hover:text-blue-700" />
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Preventivní péče</h4>
              <p className="text-gray-700">Pravidelné kontroly, dentální hygiena, fluoridace a prevence zubních onemocnění.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-white group">
              <Heart className="h-8 w-8 text-blue-900 mb-4 transition-colors duration-200 group-hover:text-blue-700" />
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Konzervační léčba</h4>
              <p className="text-gray-700">Léčba zubního kazu, výplně, inlaye, onlaye z nejkvalitnějších materiálů.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-white group">
              <Stethoscope className="h-8 w-8 text-blue-900 mb-4 transition-colors duration-200 group-hover:text-blue-700" />
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Endodoncie</h4>
              <p className="text-gray-700">Moderní ošetření kořenových kanálků pomocí nejnovějších technologií.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-white group">
              <Smile className="h-8 w-8 text-blue-900 mb-4 transition-colors duration-200 group-hover:text-blue-700" />
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Estetická stomatologie</h4>
              <p className="text-gray-700">Bělení zubů, keramické fazety, estetické výplně pro krásný úsměv.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-white group">
              <Scissors className="h-8 w-8 text-blue-900 mb-4 transition-colors duration-200 group-hover:text-blue-700" />
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Chirurgické zákroky</h4>
              <p className="text-gray-700">Extrakce, drobné chirurgické zákroky v lokální anestezii.</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:bg-white group">
              <Eye className="h-8 w-8 text-blue-900 mb-4 transition-colors duration-200 group-hover:text-blue-700" />
              <h4 className="text-xl font-semibold text-blue-900 mb-3">Protetika</h4>
              <p className="text-gray-700">Korunky, můstky, částečné i celkové náhrady nejvyšší kvality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Information Section */}
      <section id="pacienti" className="py-20 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-serif font-bold text-blue-900 text-center mb-12">Informace pro pacienty</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-blue-50">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Pojišťovny</h4>
              <p className="text-gray-700 mb-3">Máme smlouvu se všemi zdravotními pojišťovnami:</p>
              <ul className="text-gray-700 space-y-1 list-disc list-inside">
                <li>VZP ČR</li>
                <li>Česká průmyslová zdravotní pojišťovna</li>
                <li>Oborová zdravotní pojišťovna</li>
                <li>Vojenská zdravotní pojišťovna</li>
                <li>Zdravotní pojišťovna MV ČR</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-blue-50">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">První návštěva</h4>
              <p className="text-gray-700 mb-3">Na první vyšetření si prosím přineste:</p>
              <ul className="text-gray-700 space-y-1 list-disc list-inside">
                <li>Platný průkaz totožnosti</li>
                <li>Kartu pojištěnce</li>
                <li>Předchozí lékařské zprávy</li>
                <li>Seznam užívaných léků</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-blue-50">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Ordinační řád</h4>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Objednání pacientů probíhá telefonicky nebo osobně</li>
                <li>V případě zrušení termínu prosíme o včasné oznámení</li>
                <li>V ordinaci je zákaz kouření</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:bg-blue-50">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Bezpečnost</h4>
              <p className="text-gray-700">
                Naše ordinace splňuje všechny hygienické a bezpečnostní standardy. 
                Používáme pouze sterilní nástroje a dodržujeme přísné protokoly pro 
                bezpečnost pacientů i personálu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-20 px-6 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-serif font-bold text-center mb-12">Kontakt</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-blue-200 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Adresa ordinace</h4>
                    <p className="text-blue-100">
                      Lumírova 526/3<br />
                      128 00 Praha 2<br />
                      Česká republika
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-blue-200 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Telefon</h4>
                    <p className="text-blue-100">+420 261 214 794</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-blue-200 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Ordinační hodiny</h4>
                    <div className="space-y-1 text-blue-100">
                      <p>Pondělí: 8:00 - 16:00</p>
                      <p>Úterý: 8:00 - 16:00</p>
                      <p>Středa: 12:00 - 18:00</p>
                      <p>Čtvrtek: 8:00 - 16:00</p>
                      <p>Pátek: 7:00 - 13:00</p>
                      <p>Sobota - Neděle: Zavřeno</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.8!2d14.4!3d50.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94eb8ce2b533%3A0x400af0f6614c5cc0!2sLum%C3%ADrova%20526%2F3%2C%20128%2000%20Praha%202!5e0!3m2!1scs!2scz!4v1699889234567!5m2!1scs!2scz"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa ordinace"
                  className="rounded"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Stethoscope className="h-6 w-6" />
            <span className="text-xl font-serif font-bold">MUDr. Ondřej Vácha</span>
          </div>
          <p className="text-blue-200 text-sm">
            © 2024 Zubní ordinace MUDr. Ondřej Vácha. Všechna práva vyhrazena.
          </p>
          <p className="text-blue-200 text-xs mt-2">
            IČO: 05143411 | Poskytovatel zdravotních služeb dle zákona č. 372/2011 Sb.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;