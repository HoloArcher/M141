# Modul 141 individuelles Projekt
## Arbeitsjournal
### Grobbeschrieb
	Es soll für die aktuelle Todo-App Projekt einen Benutzer Login erstellt werden. Dazu das Datenbank Schema mittels knex kreiert werden.

	Zur Datenbank soll hinzugefügt werden:
	Mykek.owner soll ein verschlüsseltes Passwort bekommen.
	Man sollte nur ein Todo unter seinen eigenen Name kreieren, löschen und ändern können.
### Mittel und Methode
#### Frontend
* Vue
	* Vuetify

* Axios

#### Backend
* Express
* Knex
* jsonwebtoken
* Bcrypt

#### Vorarbeit
Das Projekt: Todo-App.

#### Neue Kenntnisse
##### Vertiefung in
* JWT
* Bcrypt
* loginverfahren

### Arbeitsjournal
* Datenbank angepasst 
	* zur tabbelle user eine neuen Attribut password hinzugefuegt.
	* fuelldaten angepasst.
	* hashen des passworts erfolgt mit bcrypt v 3.0.0
* login path erstellen
	* JWT brauchen /api/login

* frontend anpassen
