# GitHub Repository Setup

Manual steps required to activate the CI/CD pipeline.

---

## 1. Branch Protection Rules

Go to: **GitHub repo → Settings → Branches → Add rule**

### `main` branch
- [x] Require a pull request before merging
- [x] Require status checks to pass before merging
  - Required checks: `Frontend CI`, `Backend CI`
- [x] Require branches to be up to date before merging
- [x] Do not allow bypassing the above settings

### `develop` branch
- [x] Require a pull request before merging
- [x] Require status checks to pass before merging
  - Required checks: `Frontend CI`, `Backend CI`
- [x] Require branches to be up to date before merging

---

## 2. GitHub Environments

Go to: **GitHub repo → Settings → Environments**

Create two environments: `staging` and `production`

---

## 3. GitHub Secrets

Go to: **GitHub repo → Settings → Secrets and variables → Actions**

### Repository-level secrets (used by `ci.yml`)
None needed — CI uses dummy env vars inline.

### `staging` environment secrets
| Secret Name | Where to Get It | Example |
|-------------|----------------|---------|
| `RENDER_STAGING_DEPLOY_HOOK` | Render dashboard → staging service → Deploy hook URL | `https://api.render.com/deploy/srv-xxx?key=yyy` |
| `STAGING_API_URL` | Render staging service URL | `https://handiwoodz-staging.onrender.com` |
| `VERCEL_STAGING_DEPLOY_HOOK` | Vercel → Project → Settings → Git → Deploy Hooks | `https://api.vercel.com/v1/integrations/deploy/xxx` |
| `STAGING_FRONTEND_URL` | Vercel staging preview URL | `https://handiwoodz-staging.vercel.app` |
| `API_URL` | Same as `STAGING_API_URL` | `https://handiwoodz-staging.onrender.com` |
| `CLOUDINARY_SYNC_SECRET` | Must match `CLOUDINARY_SYNC_SECRET` in Render env vars | any strong random string |

### `production` environment secrets
| Secret Name | Where to Get It | Example |
|-------------|----------------|---------|
| `RENDER_PROD_DEPLOY_HOOK` | Render dashboard → prod service → Deploy hook URL | `https://api.render.com/deploy/srv-xxx?key=yyy` |
| `PROD_API_URL` | Render prod service URL or custom domain | `https://api.handiwoodz.com` |
| `VERCEL_PROD_DEPLOY_HOOK` | Vercel → Project → Settings → Git → Deploy Hooks | `https://api.vercel.com/v1/integrations/deploy/xxx` |
| `PROD_FRONTEND_URL` | Production frontend URL | `https://handiwoodz.com` |
| `API_URL` | Same as `PROD_API_URL` | `https://api.handiwoodz.com` |
| `CLOUDINARY_SYNC_SECRET` | Must match `CLOUDINARY_SYNC_SECRET` in Render env vars | same strong random string |
| `REVALIDATION_SECRET` | Must match `REVALIDATION_SECRET` in Vercel + Render env vars | any strong random string |

---

## 4. Render Environment Variables (Staging & Prod)

When creating Render services, set these env vars on each instance:

```
NODE_ENV=production
DATABASE_URL=<neon-connection-string>
JWT_SECRET=<strong-random-string>
ADMIN_JWT_SECRET=<strong-random-string>
API_TOKEN_SALT=<strong-random-string>
APP_KEYS=<key1,key2,key3,key4>
CLOUDINARY_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_KEY=<your-cloudinary-api-key>
CLOUDINARY_SECRET=<your-cloudinary-api-secret>
CLOUDINARY_SYNC_SECRET=<same-as-github-secret>
REVALIDATION_SECRET=<same-as-github-secret>
FRONTEND_URL=<vercel-url-for-this-env>
```

---

## 5. Vercel Environment Variables (Staging & Prod)

```
NEXT_PUBLIC_API_URL=<render-service-url>
NEXT_PUBLIC_SITE_URL=<vercel-or-custom-domain>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=<your-unsigned-preset>
NEXT_PUBLIC_WHATSAPP_NUMBER=<phone-with-country-code>
REVALIDATION_SECRET=<same-as-github-secret>
```

---

## 6. Workflow Activation Order

The workflows are already committed. Activate them in this order:

1. **Now:** CI runs automatically on every push (already active once secrets aren't needed)
2. **After Render staging is up:** Add `staging` secrets → `deploy-staging.yml` activates on `develop` push
3. **After production cutover:** Add `production` secrets → `deploy-prod.yml` activates on `main` push
4. **Anytime:** `sync-catalog.yml` is manual — run from GitHub Actions tab

---

## 7. UptimeRobot Keep-Alive

Render free tier sleeps after 15 min of inactivity. Set up monitors:

- Go to [UptimeRobot](https://uptimerobot.com) → Add monitor
- Type: HTTP(s)
- URL: `<RENDER_SERVICE_URL>/api/categories`
- Interval: Every 10 minutes
- Create one monitor per environment (staging + production)
