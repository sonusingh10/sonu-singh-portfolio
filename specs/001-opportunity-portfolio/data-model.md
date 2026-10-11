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
| email | string or null | TODO; omit mailto when null |
| siteUrl | string | Build environment; TODO until domain shared |
| skills | grouped SkillGroup[] | Exact source categories and tools |
| certifications | string[] | Source names, no inferred level/date |
| experience | Experience[] | All source employers and source date strings |
| projects | Project[] | 7LayerX only until other projects are supplied |
| resumeSummary | string | Generated/assembled from the same source facts |

## Experience

`company`, `location`, `role`, `dates`, `summary`, and `bullets` are strings. The
date string remains verbatim because two source periods overlap. Bullets are limited
to source-supported activities and outcomes; the ~70%/24-hour metric is explicitly
approximate as supplied.

## SkillGroup

`label`, `description`, and `items: string[]`; groups are Observability, Networking,
Security, and Cloud & Systems. The grouping preserves the portfolio source's depth
and avoids implying proficiency ratings that are not supplied.

## Project

`name`, `url`, `image`, `imageAlt`, `problem`, `approach`, `outcome`, `role`,
`stack: string[] | null`, and `resultMetric: string | null`. 7LayerX's stack and
quantified outcome remain null/TODO until confirmed. Its current live content can
support a qualitative outcome: a layered library of engineering articles, labs,
modules, and tools.

## Contact Form

The browser sends visitor name, email, message, and an anti-spam honeypot value to the
configured Formspree endpoint. Visitor data is not written to local storage or site
analytics. The form is not rendered as active until `NEXT_PUBLIC_FORMSPREE_FORM_ID`
is configured.
