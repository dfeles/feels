# Local Development Setup

## Current Setup

- **Production/Vercel**: Uses npm version (`^1.0.3`) - works automatically
- **Local Development**: Can use either npm version or local version

## Option 1: Use Local Version (for testing changes)

Manually edit `package.json`:

```json
{
  "dependencies": {
    "mindone": "file:../mindone"
  }
}
```

Then run:
```bash
pnpm install
```

## Option 2: Use NPM Version (default)

Keep `package.json` as is:
```json
{
  "dependencies": {
    "mindone": "^1.0.3"
  }
}
```

## For Production/Vercel

The `package.json` should use the npm version (`^1.0.3`) before committing/deploying. Vercel builds will automatically use the published package.

