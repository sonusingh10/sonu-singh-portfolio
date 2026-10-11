# Data Model

The portfolio is static. `content/profile.ts` is the canonical in-repository record;
there is no database and no personal data from visitors is persisted by this site.

## Profile

| Field | Type | Rules |
|---|---|---|
| name | string | Supplied preferred name: Sonu Singh |
| headline | string | Evidence-led role and value proposition |
| availability | string | User-approved: open to jobs, freelance, collaborations |
| location | string | Use only if present in supplied source |
| about | string[] | Professional-only, supplied facts |
| socialLinks | typed URL list | GitHub and LinkedIn from source HTML |
| email | string | Public professional email supplied in résumé; rendered as mailto |
| siteUrl | string | Build environment; TODO until domain shared |
| skills | grouped SkillGroup[] | Source HTML and résumé, grouped without inferred proficiency ratings |
| certifications | string[] | Source names, no inferred level/date |
| education | Education | Degree, field, institution, and dates from résumé |
| experience | Experience[] | All source employers and source date strings |
| projects | Project[] | 7LayerX only until other projects are supplied |
| summary | string | Profile introduction used on page and résumé |

## Experience

`company`, `location`, `role`, `dates`, `summary`, and `bullets` are strings. The
date string remains verbatim because two source periods overlap. Bullets are limited
to source-supported activities and outcomes; the ~70%/24-hour metric is explicitly
approximate as supplied.

## SkillGroup

`label`, `description`, and `items: string[]`; groups are Observability, Networking,
Security, and Cloud & Systems. The grouping preserves the portfolio source's depth
and avoids implying proficiency ratings that are not supplied.

## Education

`degree`, `field`, `institution`, and `dates` are taken from the supplied résumé.

## Project

`name`, `label`, `url`, `image`, `imageAlt`, `problem`, `approach`, `outcome`,
`role`, and `stack: string[] | null`. 7LayerX's stack and quantified outcome are
not included because they are not confirmed. Its current live content supports a
qualitative outcome: a layered library of engineering articles, labs, modules, and tools.

## Contact Form

The browser posts visitor name, email, message, and an anti-spam honeypot value to the
configured Formspree endpoint using a native HTML form. Browser validation checks
required fields; Formspree provides its confirmation/error response. Visitor data is
not written to local storage or site analytics. The form is not rendered as active
until `NEXT_PUBLIC_FORMSPREE_FORM_ID` is configured. The public professional email
supplied in the résumé is a mailto fallback.
