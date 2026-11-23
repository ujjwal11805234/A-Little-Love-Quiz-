# A Little Love Quiz ❤️

A cute, mobile-friendly 10-question relationship quiz built with Google Apps Script and Google Sheets. Answers are saved to a private spreadsheet owned by the person deploying the app.

## Setup (about 10 minutes)

1. Sign in to the Google account where you want to receive answers.
2. Visit https://script.google.com and click **New project**.
3. Replace the contents of `Code.gs` with the supplied `Code.gs`.
4. Add two HTML files using **+ → HTML**: name one `Index` and paste `Index.html`; name the other `Admin` and paste `Admin.html`.
5. In `Code.gs`, change `ADMIN_PIN` from `2468` to a private PIN you will remember.
6. In the Apps Script editor, select the `setup` function and click **Run**. Approve the requested Google permissions. Open **Execution log** to find the private Google Sheet URL. Keep that sheet private.
7. Click **Deploy → New deployment**. Select the gear beside “Select type” → **Web app**.
8. Set **Execute as: Me** and **Who has access: Anyone** (or the broadest option available that lets your girlfriend open it). Click **Deploy** and authorize if prompted.
9. Copy the Web app URL and send it to your girlfriend. That's the game link!

## View and clear answers

- Open your game URL with `?admin=1` appended (example: `https://script.google.com/macros/s/DEPLOYMENT_ID/exec?admin=1`).
- Enter your private admin PIN to view all submissions.
- Use **Clear all answers** to delete saved responses and start a fresh round. This does not delete the spreadsheet or change the game link.
- You can also open the private Google Sheet URL from the setup execution log.

## Important notes

- The game link is shareable; anyone with the link may submit answers.
- Only the deploying Google account owns the answer spreadsheet. Do not share the spreadsheet itself if you want answers to remain private.
- The admin PIN is a simple access gate, not high-security authentication. Keep it private and change it before deployment.
- “Play again” on the game resets the current player's form for another submission; it does not erase previously submitted responses.
- If you edit the code after deployment, use **Deploy → Manage deployments → Edit → New version → Deploy** so the live link receives the changes.
