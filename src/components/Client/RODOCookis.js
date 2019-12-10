import React, {Component} from 'react';


export default class RODOCookis extends Component {

        render()
        {
            return (
                <div>
                    <h5 style={{textAlign:"center"}}>Polityka Cookies</h5>

                    <p>
                        Poniższa
                        Polityka
                        Cookies
                        określa
                        zasady
                        zapisywania
                        i
                        uzyskiwania
                        dostępu
                        do
                        danych
                        na
                        Urządzeniach
                        Użytkowników
                        korzystających
                        z
                        Serwisu
                        do
                        celów
                        świadczenia
                        usług
                        drogą
                        elektroniczną
                        przez
                        Administratora
                        Serwisu
                        .</p>

                    <h6 style={{textAlign:"center"}}>§ 1 Definicje</h6>
                    <ul>
                        <li><p><strong>Serwis</strong> - serwis internetowy działający pod adresem <span
                            id="serwis"><span
                            className="colored">https://your-gym.herokuapp.com/login</span></span></p></li>
                        <li><p><strong>Serwis zewnętrzny</strong> - serwis internetowe partnerów, usługodawców lub
                            usługobiorców Administratora</p></li>
                        <li><p><strong>Administrator</strong> - firma <span id="firma"><span
                            className="colored">your-gym</span>, prowadząca działalność pod adresem: <span
                            className="colored">Worcław</span>, o nadanym numerze identyfikacji podatkowej (NIP): <span
                            className="colored">123456789</span></span>, świadcząca usługi drogą elektroniczną za
                            pośrednictwem Serwisu oraz przechowująca i uzyskująca dostęp do informacji w urządzeniach
                            Użytkownika</p></li>
                        <li><p><strong>Użytkownik</strong> - osba fizyczna, dla której Administrator świadczy usługi
                            drogą
                            elektroniczna za pośrednictwem Serwisu.</p></li>
                        <li><p><strong>Urządzenie</strong> - elektroniczne urządzenie wraz z oprogramowaniem, za
                            pośrednictwem, którego Użytkownik uzyskuje dostęp do Serwisu</p></li>
                        <li><p><strong>Cookies (ciasteczka)</strong> - dane tekstowe gromadzone w formie plików
                            zamieszczanych na Urządzeniu Użytkownika</p></li>
                    </ul>
                    <h6 style={{textAlign:"center"}}>§ 2 Rodzaje Cookies</h6>
                    <ul>
                        <li><p><strong>Cookies wewnętrzne</strong> - pliki zamieszczane i odczytywane z Urządzenia
                            Użytkownika przes system teleinformatyczny Serwisu</p></li>
                        <li><p><strong>Cookies zewnętrzne</strong> - pliki zamieszczane i odczytywane z Urządzenia
                            Użytkownika przez systemy teleinformatyczne Serwisów zewnętrznych</p></li>
                        <li><p><strong>Cookies sesyjne</strong> - pliki zamieszczane i odczytywane z Urządzenia
                            Użytkownika
                            przez Serwis <span>lub Serwisy zewnętrzne</span> podczas
                            jednej
                            sesji danego Urządzenia. Po zakończeniu sesji pliki są usuwane z Urządzenia Użytkownika.</p>
                        </li>
                        <li><p><strong>Cookies trwałe</strong> - pliki zamieszczane i odczytywane z Urządzenia
                            Użytkownika
                            przez Serwis <span id="sz2" >lub Serwisy zewnętrzne</span> do momentu
                            ich
                            ręcznego usunięcia. Pliki nie są usuwane automatycznie po zakończeniu sesji Urządzenia chyba
                            że
                            konfiguracja Urządzenia Użytkownika jest ustawiona na tryb usuwanie plików Cookie po
                            zakończeniu
                            sesji Urządzenia.</p></li>
                    </ul>

                    <h6 style={{textAlign:"center"}}>§ 3 Bezpieczeństwo</h6>
                    <ul>
                        <li><p><strong>Mechanizmy składowania i odczytu</strong> - Mechanizmy składowania i odczytu
                            Cookies
                            nie pozwalają na pobierania jakichkolwiek danych osobowych ani żadnych informacji poufnych z
                            Urządzenia Użytkownika. Przeniesienie na Urządzenie Użytkownika wirusów, koni trojańskich
                            oraz
                            innych robaków jest praktynie niemożliwe.</p></li>
                        <li><p><strong>Cookie wewnętrzne</strong> - zastosowane przez Administratora Cookie wewnętrzne
                            są
                            bezpieczne dla Urządzeń Użytkowników</p></li>
                        <li><p><strong>Cookie zewnętrzne</strong> - za bezpieczeństwo plików Cookie pochodzących od
                            partnerów Serwisu Administrator nie ponosi odpowiedzialności. Lista partnerów zamieszczona
                            jest
                            w dalszej części Polityki Cookie.</p></li>
                    </ul>

                    <h6 sttyle={{textAlign:"center"}}>§ 4 Cele do których wykorzystywane są pliki Cookie</h6>
                    <ul id="cele">
                        <li><p><strong><span
                            className="colored">Usprawnienie i ułatwienie dostępu do Serwisu</span></strong> -
                            Administrator
                            może przechowywać w plikach Cookie informacje o prefernecjach i ustawieniach użytkownika
                            dotyczących Serwisu aby usprawnić, polepszyć i przyśpieszyć świadczenie usług w ramach
                            Serwisu.
                        </p></li>
                        <li><p><strong><span className="colored">Logowanie</span></strong> - Administrator wykorzystuje
                            pliki Cookie do celów logowania Użytkowników w Serwisie</p></li>
                    </ul>
                    <h6 style={{textAlign:"center"}}>§ 5 Serwisy zewnętrzne</h6>
                    <p id="zewinfo"><span className="colored">Administrator nie współpracuje z serwisami zewnętrznymi i Serwis nie umieszcza ani nie korzysta z żadnych plików zewnętrznych plików Cookie.</span>
                    </p>
                    <ul id="zewnetrzne"></ul>
                    <h6 style={{textAlign:"center"}}>§ 6 Możliwości określania warunków przechowywania i uzyskiwania
                        dostępu na
                        Urządzeniach Użytkownika przez Serwis<span id="sz6"
                                                                  > i Serwisy zewnętrzne</span>
                    </h6>
                    <ul>
                        <li><p>Użytkownik może w dowolnym momencie, samodzielnie zmienić ustawienia dotyczące
                            zapisywania,
                            usuwania oraz dostępu do danych zapisanych plików Cookies</p></li>
                        <li><p>Informacje o sposobie wyłączenia plików Cookie w najpopularniejszych przeglądarkach
                            komputerowych i urządzeń mobilnych dostępna są na stronie: <a
                                href="http://jakwylaczyccookie.pl">jak wyłączyć cookie</a>.</p></li>
                        <li><p>Użytkownik może w dowolnym momencie usunąć wszelkie zapisane do tej pory pliki Cookie
                            korzystając z narzędzi Urządzenia Użytkownika za pośrednictwem którego Użytkowanik korzysta
                            z
                            usług Serwisu.</p></li>
                    </ul>
                    <h6 style={{textAlign:"center"}}>§ 7 Wymagania Serwisu</h6>
                    <ul>
                        <li><p>Ograniczenie zapisu i dostępu do plików Cookie na Urządzeniu Użytkownika może spowodować
                            nieprawidłowe działanie niektórych funkcji Serwisu.</p></li>
                        <li><p>Administrator nie ponosi żadnej odpowiedzialności za nieprawidłowo działające funkcje
                            Serwisu
                            w przypadku gdy Użytkownik ograniczy w jakikolwiek sposób możliwość zapisywania i odczytu
                            plików
                            Cookie.</p></li>
                    </ul>
                    <h6 style={{textAlign:"center"}}>§ 8 Zmiany w Polityce Cookie</h6>
                    <ul>
                        <li><p>Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej Polityki Cookie bez
                            konieczności informowania o tym użytkowników.</p></li>
                        <li><p>Wprowadzone zmiany w Polityce Cookie zawsze będą publikowane na tej stronie.</p></li>
                        <li><p>Wprowadzone zmiany wchodzą w życie w dniu publikacji Polityki Cookie.</p></li>
                    </ul>
                </div>
            );
        }
    }


