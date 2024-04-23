# Moment 2, _Objektorienterad programmering_
Den här README-filen har skapats för att beskriva momentets syfte och hur lösningen är konstruerad samt hur den används. 

## Momentets syfte

Syftet med detta moment är att skapa en "att göra"-applikation med TypeScript och använda principer för objektorienterad programmering. I arbetet med momentet används interfaces, olika typer och lagring i LocalStorage.

## Lösningens konstruktion

Lösningen är uppbyggd med HTML, CSS (SCSS) och TypeScript samt Parcel.

### Om klassfilen
- ett interface är skapat som definierar kontraktet för ett nytt objekt.
- en klass har skapats som använder sig av interfacet.
- klassen använder sig av en konstruktor som hämtar lagrade poster.
- i klassen finns definierade metoder för att hämta, lägga till, spara, markera/avmarkera och radera poster.
- klassen exporteras till main.ts-filen.

### Om main.js-filen
- klassen importeras från klassfilen för användning.
- i funktionen "handleForm" hämtas inputvärdet in och kontrolleras innan ny uppgift läggs till.
- i funktionen "updateToDoLIst" skapas en ny div/p med angiven uppgift tillsammans med avklarad/ej klar-knapp och radera-knapp samt lägger till i containern för angiven prioritet.
- i funktionen "completeToDo" hanteras status. Index hämtas för specifika uppgifter från listan och visar dessa som avklarade/ej klara med motsvarande knapptext samt uppdaterar listan.
- i funktionen "deleteToDo" hämtas index för den specifika uppgiften, raderar den och uppdaterar listan.

## Användning

- fyll i en uppgift och ange prioritet. Klicka på lägg till och uppgiften läggs till i listan för vald prioritet. Uppgiften lagras i localStorage.
- uppgiften kan markeras som avklarad via knappen "Avklarad" eller raderas med knappen "Radera". Vid radering rensas localStorage.
- när uppgiften markerats som avklarad ändras texten på knappen till "Ej klar" vilken används för att avmarkera uppgiften igen.

#### _Skapad av Jenny Lind, jeli2308_.