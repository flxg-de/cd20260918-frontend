# Drift gegenüber OVERVIEW.md

Ergebnis der Prüfung des Frontends (Community Days, Slots, Talks) gegen
`../OVERVIEW.md` (Stand: 2026-09-17). Noch nicht behoben — TODO für später.

## 1. Keine Historie für vergangene Community Days
Es gibt keine Möglichkeit, Slots/Talks eines *vergangenen* Community Days
einzusehen. `SlotListComponent` (`src/app/slots/slot-list/slot-list.component.ts`)
ruft `listSlots({})` ohne `communityDayId` auf, `TalkOverviewComponent`/
`TalkMineComponent` ebenso ohne `communityDayId`. Es fehlt jede Route/Auswahl,
um einen historischen Community Day zu betrachten.
- OVERVIEW.md: "Vergangene Community Days bleiben einsehbar (Talks, finaler
  Tagesablauf, Zuordnungen) — als Historie, nicht mehr veränderbar."
- Modelle (`Talk`, `Slot`) tragen bereits `communityDayId` — Backend
  unterstützt es, Frontend nutzt es nicht.

## 2. Slot-Anlage ohne Phasen-Prüfung
`slot-create.component.ts`/`slot-edit.component.ts` prüfen die Phase des
aktuellen Community Day nicht (kein `CommunityDaysService` injiziert).
Organisatoren können Slots jederzeit anlegen/bearbeiten, auch während der
Einreichungsphase.
- OVERVIEW.md: Slots sind "das Ergebnis der Planung nach Ende der
  Einreichungsphase". `talk-create.component.ts` macht die analoge Prüfung
  bereits korrekt für Talks (gated auf `CommunityDayPhase.SUBMISSION`).

## 3. Zuordnung/Ablehnung ohne Status-Schutz im Organisator-Overview
In `talk-overview.component.html`/`.ts`:
- Das Slot-Zuordnungs-`<select>` wird für **alle** Talks gerendert, auch für
  bereits `REJECTED` — es gibt keinen `REJECTED → ASSIGNED`-Übergang laut
  Fachlichkeit.
- Die "Ablehnen"-Aktion ist nur für `ASSIGNED` ausgeblendet
  (`@if (talk.status !== 'ASSIGNED')`), nicht aber für bereits `REJECTED`
  (führt zu redundantem erneuten Ablehnen).
- Fix: clientseitige Guards ergänzen (nur `SUBMITTED` zuordnen/ablehnen
  lassen), Backend validiert zwar, UI sollte ungültige Aktionen nicht
  anbieten.

## 4. Kein reines Tags-Quick-Edit für Organisatoren
`talk-edit.component.ts` ist eine generische Edit-Form (Titel, Speaker,
Beschreibung, Dauer, Tags) ohne Owner-/Status-Check im Component selbst.
- OVERVIEW.md: Tags dürfen von Referent/in (Besitzer/in) **oder**
  Organisatoren angepasst werden — aber Organisatoren sollten (fachlich) nur
  Tags ändern dürfen, nicht Titel/Speaker/Dauer fremder Talks.
- Fix: dedizierte Tags-only-Quick-Edit-Oberfläche für Organisatoren auf
  fremden Talks (API: `PUT /talks/{id}/tags` existiert bereits, ist aber nur
  implizit über die volle Edit-Form genutzt).

## 5. `teamsLink` wird nirgends angezeigt
Feld existiert im `Talk`-Modell (`src/api/model/talk.ts`), wird aber weder in
`talk-mine.component.html` noch in `talk-overview.component.html` gerendert.
- OVERVIEW.md impliziert, dass der Link sichtbar sein sollte, sobald er
  gesetzt ist (Generierung selbst ist out of scope).
- Fix: Link anzeigen (z. B. bei zugeordneten Talks), sobald `teamsLink`
  nicht `null` ist.

## 6. Swimlane fehlt im Zuordnungs-Dropdown
`slotLabel()` in `talk-overview.component.ts` zeigt nur Zeit + Raum, keine
Swimlane — erschwert das fachlich gewünschte Gruppieren thematisch
ähnlicher Talks beim Zuordnen.
- Fix: Swimlane in den Dropdown-Optionen mit anzeigen.

## Bereits korrekt (kein Drift, zur Referenz)
- Status-Flow-Labels/Filter im Organisator-Overview.
- Gesperrte Slots werden korrekt vom Zuordnungs-Dropdown ausgeschlossen
  (`availableSlots = computed(() => slots.filter(s => !s.locked))`).
- Format-/Standort-Enums stimmen exakt mit der Spec überein; `Talk` hat kein
  eigenes Format-Feld (implizite Übernahme vom Slot korrekt im Datenmodell).
- Übergang Einreichung → Planung ist ein expliziter, bestätigter Schritt.
- Referenten-Edit/Withdraw korrekt auf Status `SUBMITTED` begrenzt
  (`isTalkEditableByOwner` in `talk-status.util.ts`).
