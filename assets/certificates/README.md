# Certificate documents

Place matched certificate PDFs in `assets/certificates/` when ready, then add exact credential titles and their relative file paths to the `certificatePdfs` object in `assets/js/certifications.js`.

Example mapping:
```js
const certificatePdfs = {
  "Exact title from the credentials list": "assets/certificates/example-certificate.pdf"
};
```

A mapped credential card will show a **Preview PDF** control that opens the PDF inside the certificate preview dialog, with the PDF still viewable in the browser's native controls. Credentials without a matched PDF continue linking to the LinkedIn credentials list. Only map files that have been matched to the correct credential.
