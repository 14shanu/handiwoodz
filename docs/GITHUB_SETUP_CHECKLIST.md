# GitHub CI/CD Setup Checklist

This guide walks you through configuring GitHub for the Handiwoodz CI/CD pipeline. All steps are manual GitHub UI configuration.

**Repository:** https://github.com/abhisheksinghal1497/Handiwoodz

---

## Part 1: Branch Protection Rules

### Step 1.1: Configure `main` Branch Protection

**Go to:** GitHub repo → **Settings** → **Branches** → **Add rule**

1. **Branch name pattern:** `main`
2. **Require a pull request before merging**
   - Check: ✅ Require approvals
   - Required number of approvals before merge: `1`
3. **Require status checks to pass before merging**
   - Check: ✅ Require branches to be up to date before merging
   - Search for and select both:
     - `Frontend CI`
     - `Backend CI`
4. **Restrict who can push to matching branches**
   - Leave unchecked (allow all)
5. **Allow force pushes**
   - Select: "Do not allow force pushes"
6. **Allow deletions**
   - Check: ✅ Allow deletions

**Click:** "Create" button

---

### Step 1.2: Configure `develop` Branch Protection

**Go to:** GitHub repo → **Settings** → **Branches** → **Add rule**

1. **Branch name pattern:** `develop`
2. **Require a pull request before merging**
   - Check: ✅ Require approvals
   - Required number of approvals before merge: `1`
3. **Require status checks to pass before merging**
   - Check: ✅ Require branches to be up to date before merging
   - Search for and select both:
     - `Frontend CI`
     - `Backend CI`
4. **Restrict who can push to matching branches**
   - Leave unchecked
5. **Allow force pushes**
   - Select: "Do not allow force pushes"
6. **Allow deletions**
   - Check: ✅ Allow deletions

**Click:** "Create" button

---

## Part 2: GitHub Environments

### Step 2.1: Create `staging` Environment

**Go to:** GitHub repo → **Settings** → **Environments** → **New environment**

1. **Name:** `staging`
2. **Click:** "Configure environment"
3. **Deployment branches:** Select "Protected branches only"

**Save** (no additional rules needed)

---

### Step 2.2: Create `production` Environment

**Go to:** GitHub repo → **Settings** → **Environments** → **New environment**

1. **Name:** `production`
2. **Click:** "Configure environment"
3. **Deployment branches:** Select "Protected branches only"
4. **Add deployment branch rule:**
   - Pattern: `main`
   - Click "Add rule"
5. **Required reviewers:** (Optional) Add reviewers for production deployments

**Save**

---

## Part 3: GitHub Environment Secrets

### Step 3.1: Add `staging` Environment Secrets

**Go to:** GitHub repo → **Settings** → **Environments** → **staging** → **Add secret**

Add the following 6 secrets to the `staging` environment:

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `RENDER_STAGING_DEPLOY_HOOK` | `https://api.render.com/deploy/srv-xxx?key=yyy` | Render dashboard → Staging service → Settings → Deploy → Copy Deploy Hook |
| `STAGING_API_URL` | `https://handiwoodz-staging.onrender.com` | Render staging service URL |
| `VERCEL_STAGING_DEPLOY_HOOK` | `https://api.vercel.com/v1/integrations/deploy/xxx` | Vercel → Project → Settings → Git → Deploy Hooks → Copy URL |
| `STAGING_FRONTEND_URL` | `https://handiwoodz-staging.vercel.app` | Vercel staging preview URL |
| `API_URL` | (Same as `STAGING_API_URL`) | `https://handiwoodz-staging.onrender.com` |
| `CLOUDINARY_SYNC_SECRET` | `<strong-random-string>` | Generate a random secret (e.g., `openssl rand -hex 32`) |

**For each secret:**
1. Click "New secret"
2. **Name:** Enter the secret name from table above
3. **Value:** Enter the value from table above
4. Click "Add secret"

---

### Step 3.2: Add `production` Environment Secrets

**Go to:** GitHub repo → **Settings** → **Environments** → **production** → **Add secret**

Add the following 7 secrets to the `production` environment:

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `RENDER_PROD_DEPLOY_HOOK` | `https://api.render.com/deploy/srv-xxx?key=yyy` | Render dashboard → Production service → Settings → Deploy → Copy Deploy Hook |
| `PROD_API_URL` | `https://api.handiwoodz.com` | Render prod service URL or custom domain |
| `VERCEL_PROD_DEPLOY_HOOK` | `https://api.vercel.com/v1/integrations/deploy/xxx` | Vercel → Project → Settings → Git → Deploy Hooks → Copy URL |
| `PROD_FRONTEND_URL` | `https://handiwoodz.com` | Production frontend URL |
| `API_URL` | (Same as `PROD_API_URL`) | `https://api.handiwoodz.com` |
| `CLOUDINARY_SYNC_SECRET` | (Same as staging) | Use the same strong random string |
| `REVALIDATION_SECRET` | `<strong-random-string>` | Generate a random secret (e.g., `openssl rand -hex 32`) |

**For each secret:**
1. Click "New secret"
2. **Name:** Enter the secret name from table above
3. **Value:** Enter the value from table above
4. Click "Add secret"

---

## Part 4: Verification Checklist

### Step 4.1: Verify Branch Protection Rules

- [ ] Go to Settings → Branches
- [ ] Confirm `main` rule exists with:
  - [ ] PR required
  - [ ] `Frontend CI` status check required
  - [ ] `Backend CI` status check required
  - [ ] Up-to-date branches required
- [ ] Confirm `develop` rule exists with same checks

### Step 4.2: Verify Environments Created

- [ ] Go to Settings → Environments
- [ ] Confirm `staging` environment exists
- [ ] Confirm `production` environment exists

### Step 4.3: Verify `staging` Environment Secrets

- [ ] Go to Settings → Environments → `staging`
- [ ] Confirm all 6 secrets are present:
  - [ ] `RENDER_STAGING_DEPLOY_HOOK`
  - [ ] `STAGING_API_URL`
  - [ ] `VERCEL_STAGING_DEPLOY_HOOK`
  - [ ] `STAGING_FRONTEND_URL`
  - [ ] `API_URL`
  - [ ] `CLOUDINARY_SYNC_SECRET`

### Step 4.4: Verify `production` Environment Secrets

- [ ] Go to Settings → Environments → `production`
- [ ] Confirm all 7 secrets are present:
  - [ ] `RENDER_PROD_DEPLOY_HOOK`
  - [ ] `PROD_API_URL`
  - [ ] `VERCEL_PROD_DEPLOY_HOOK`
  - [ ] `PROD_FRONTEND_URL`
  - [ ] `API_URL`
  - [ ] `CLOUDINARY_SYNC_SECRET`
  - [ ] `REVALIDATION_SECRET`

---

## Part 5: Test CI Workflow

### Step 5.1: Trigger CI on `develop`

1. **Create a test branch:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b test/ci-verification
   ```

2. **Make a trivial change:**
   ```bash
   echo "# Test" >> TEST.md
   git add TEST.md
   git commit -m "test: verify CI pipeline"
   git push origin test/ci-verification
   ```

3. **Create a pull request** (on GitHub UI)
   - Go to GitHub repo
   - Click "Pull requests" → "New pull request"
   - Base: `develop`, Compare: `test/ci-verification`
   - Title: "Test: Verify CI Pipeline"
   - Click "Create pull request"

### Step 5.2: Monitor CI Execution

- [ ] GitHub shows workflow running (orange dot on PR)
- [ ] Wait 3-5 minutes for workflows to complete
- [ ] Verify both `Frontend CI` and `Backend CI` show ✅ (green checkmarks)
- [ ] Confirm you **cannot** merge the PR until both checks pass

### Step 5.3: Verify Branch Protection Enforcement

- [ ] After CI passes, the "Merge" button becomes enabled
- [ ] Try to merge → confirm it works
- [ ] Delete the test branch and PR

---

## Part 6: Generate Required Secrets

### Generate Random Secrets for `CLOUDINARY_SYNC_SECRET` and `REVALIDATION_SECRET`

**Option 1: Using OpenSSL (macOS/Linux)**
```bash
# Generate a 32-byte (256-bit) hex string
openssl rand -hex 32
# Output: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6

# Use this for both CLOUDINARY_SYNC_SECRET and REVALIDATION_SECRET
```

**Option 2: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 3: Online Generator**
- Go to https://www.random.org/bytes/ 
- Generate 32 bytes, convert to hex

---

## Part 7: Final Checklist

**Before moving to Phase 2 (Staging Environment Setup):**

- [ ] All branch protection rules configured and tested
- [ ] GitHub `staging` environment created with 6 secrets
- [ ] GitHub `production` environment created with 7 secrets
- [ ] CI workflow verified on test PR (both Frontend CI and Backend CI passed)
- [ ] You can access GitHub repo settings without issues
- [ ] You have Render and Vercel deploy hook URLs ready (or know where to get them)

---

## Troubleshooting

### CI Workflow Not Running

1. Check that workflows are not disabled:
   - Go to GitHub repo → **Actions** → Verify workflows are listed
   - Click each workflow and confirm it's enabled

2. Check branch protection rule status checks match workflow job names:
   - Workflow jobs: `Frontend CI`, `Backend CI`
   - Branch protection requires: `Frontend CI`, `Backend CI`
   - These must match exactly

### Cannot Find Deploy Hooks

**For Render:**
1. Go to https://dashboard.render.com
2. Click the service (staging or production)
3. Click **Settings** → scroll to **Deploy** section
4. Copy the Deploy Hook URL

**For Vercel:**
1. Go to https://vercel.com
2. Click the project
3. Click **Settings** → **Git** → **Deploy Hooks**
4. Create a new hook or copy existing URL

### Secret Not Working

1. Double-check the secret name spelling (case-sensitive)
2. Ensure the secret is in the correct environment (`staging` vs `production`)
3. Verify the value doesn't have extra spaces or newlines
4. Delete and re-add the secret if unsure

---

## Next: Phase 2

Once Part 7 is complete, you're ready for **Phase 2: Staging Environment Setup**.

This involves:
1. Creating Neon database (staging branch)
2. Creating Render staging instance
3. Configuring Vercel staging branch
4. Running first catalog sync on staging

