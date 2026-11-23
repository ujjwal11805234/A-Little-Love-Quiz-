const APP_TITLE = "A Little Love Quiz ❤️";
const ADMIN_PIN = "2468"; // CHANGE THIS before deploying.
const SHEET_NAME = "Responses";

function doGet(e) {
  const page = e && e.parameter && e.parameter.admin === "1" ? "Admin" : "Index";
  return HtmlService.createHtmlOutputFromFile(page)
    .setTitle(APP_TITLE)
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function setup() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty("SPREADSHEET_ID");
  let ss;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (err) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create("Our Love Quiz - Answers");
    props.setProperty("SPREADSHEET_ID", ss.getId());
  }
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Submitted at", "Name / nickname", "Q1 First impression", "Q2 Favourite memory",
      "Q3 Makes you smile", "Q4 Most dramatic", "Q5 Do more together", "Q6 Feel loved (1-10)",
      "Q7 Boyfriend improvement", "Q8 Never change", "Q9 Dream date", "Q10 Relationship happiness (1-10)"]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 12).setFontWeight("bold");
  }
  Logger.log("Your private answer spreadsheet: " + ss.getUrl());
  return ss.getUrl();
}

function getSheet_() {
  const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!id) throw new Error("Run setup() once in the Apps Script editor first.");
  return SpreadsheetApp.openById(id).getSheetByName(SHEET_NAME);
}

function submitAnswers(payload) {
  if (!payload || !Array.isArray(payload.answers) || payload.answers.length !== 10) {
    throw new Error("Please answer all 10 questions.");
  }
  const clean = payload.answers.map(v => String(v || "").trim());
  if (clean.some(v => !v)) throw new Error("Please answer all 10 questions.");
  const name = String(payload.name || "Anonymous").trim().slice(0, 80);
  const sheet = getSheet_();
  sheet.appendRow([new Date(), name, ...clean]);
  return "Your answers are saved. Thanks for playing! ❤️";
}

function getResponses(pin) {
  checkPin_(pin);
  const values = getSheet_().getDataRange().getValues();
  if (values.length <= 1) return [];
  return values.slice(1).reverse().map(row => ({
    submittedAt: Utilities.formatDate(new Date(row[0]), Session.getScriptTimeZone(), "dd MMM yyyy, hh:mm a"),
    name: row[1],
    answers: row.slice(2, 12)
  }));
}

function clearResponses(pin) {
  checkPin_(pin);
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last > 1) sheet.deleteRows(2, last - 1);
  return "All saved answers have been cleared.";
}

function checkPin_(pin) {
  if (String(pin || "") !== ADMIN_PIN) throw new Error("Incorrect admin PIN.");
}
