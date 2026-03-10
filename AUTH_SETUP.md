# KachraCash Auth Setup

## Prerequisites

Before running the app, you need to complete the Convex setup:

1. **Create a Convex project:**
   ```bash
   cd KachraCash
   npx convex dev
   ```

2. **Follow the interactive prompts:**
   - Select "Create a new project"
   - Enter a project name (e.g., "kachracash")
   - Wait for the deployment to be created

3. **Configure environment variables:**

   Copy the values from your Convex dashboard to `.env.local`:
   ```
   CONVEX_DEPLOYMENT=your-deployment.convex.cloud
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
   ```

4. **Set up Google OAuth (optional):**
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add the callback URL from Convex
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
     GOOGLE_CLIENT_SECRET=your-client-secret
     ```

5. **Generate an AUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```
   Add to `.env.local`:
   ```
   AUTH_SECRET=your-generated-secret
   ```

## Running the App

```bash
npm run dev
```

## Auth Features

- **Multi-identifier Login**: Users can sign in with email, phone, or username
- **Password Visibility Toggle**: Eye icon to show/hide password
- **Form Validation**: Real-time validation with Zod
- **Loading States**: Spinners on all buttons during auth operations
- **Error Handling**: Toast notifications for errors
- **Shake Animation**: Form shakes on authentication failure
- **Forgot Password**: OTP-based password reset flow
- **Protected Routes**: Middleware redirects unauthenticated users

## Project Structure

```
convex/
├── schema.ts           # Database schema with auth tables
├── auth.ts            # Auth configuration with Password provider
├── authModel.ts       # Auth table definitions
├── authActions.ts     # Auth actions (signIn, signUp, signOut)
├── users.ts           # User queries and mutations
└── http.ts            # HTTP routes for OAuth callbacks

components/auth/
├── AuthCore.tsx       # Central hub with view transitions
├── LoginForm.tsx      # Multi-identifier login form
├── SignupForm.tsx     # Registration form
├── ForgotPasswordForm.tsx  # Password reset form
├── PasswordInput.tsx  # Password input with visibility toggle
└── GoogleButton.tsx   # Google OAuth button

app/(auth)/
├── layout.tsx         # Auth pages layout
├── sign-in/page.tsx   # Sign in page
├── sign-up/page.tsx  # Sign up page
└── forgot-password/page.tsx  # Password reset page

hooks/
└── useAuth.ts         # Auth state hooks
```
