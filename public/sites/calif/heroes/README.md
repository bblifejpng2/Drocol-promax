# Page hero photos

Drop one photo per page here, using exactly these names:

| File             | Page        | Suggested subject                   |
|------------------|-------------|-------------------------------------|
| solutions.jpg    | /solutions  | Server room or security operations  |
| company.jpg      | /company    | Your team or office                 |
| industries.jpg   | /industries | Lagos skyline or a business district |
| research.jpg     | /research   | Code on a screen or a data visual   |
| contact.jpg      | /contact    | Reception, desk, or meeting room    |
| home.jpg         | /           | Homepage hero                       |
| book.jpg         | /book       | Pricing / Book a test               |
| article.jpg      | /research/* | Research article pages              |

Landscape, at least 1920 x 1080, ideally under 500 KB. A dark overlay is
added automatically so the white heading stays readable. Until a file is
added, that page shows the shared homepage background.

## Current photos and credits

All from Unsplash under the Unsplash License (free for commercial use,
credit not required but appreciated). Downloaded 2026-11-04.

| File           | Photographer                     | Source                                   |
|----------------|----------------------------------|------------------------------------------|
| solutions.jpg  | Kevin Ache                       | https://unsplash.com/photos/2JJ3wBHu4_0  |
| company.jpg    | Christina @ wocintechchat.com    | https://unsplash.com/photos/faEfWCdOKIg  |
| industries.jpg | Malik Buraimoh                   | https://unsplash.com/photos/EMjpo0YjHPw  |
| research.jpg   | Chris Ried                       | https://unsplash.com/photos/ieic5Tq8YMk  |
| contact.jpg    | Aalo Lens                        | https://unsplash.com/photos/Ypv0MH4izf8  |
| home.jpg       | Namnso Ukpanah                   | https://unsplash.com/photos/6UqJTfoXIq8  |
| book.jpg       | Kevin Horvat                     | https://unsplash.com/photos/Pyjp2zmxuLk  |
| article.jpg    | Pawel Czerwinski                 | https://unsplash.com/photos/fPN1w7bIuNU  |

## Edits

`contact.jpg` has a brushed-brass Drocol sign composited onto the reception
wall. The unedited photo is `docs/design-references/contact-original.jpg`.
To regenerate (for example after a logo change), from the project root:

    node scripts/make-contact-sign.mjs docs/design-references/contact-original.jpg public/sites/calif/heroes/contact.jpg
