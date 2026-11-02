# Palak Birthday Lock Screen

A responsive React/Vite lock-screen page for Palak's birthday surprise.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Passcode

The demo passcode is `0103` (1:03 in HHMM format). Change `PASSCODE` near the top of `src/App.jsx` if needed.

## Replace Palak's photo

Replace `public/images/palak-photo.jpg` with the photo you want to use, keeping the same filename. The supplied photo has been rotated upright for the portrait frame; no facial edits were applied.

## Notes

This is a front-end surprise gate, not secure authentication. The passcode is visible in client-side code. The successful state is a placeholder for the next birthday page, which can be connected later.
