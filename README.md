<p align="center">
  <img src="https://github.com/user-attachments/assets/8794c281-f247-42ca-bfa8-65b83c999c3f" style="display: block; margin-left: auto; margin-right: auto; width: 15%; height: 75%; border-radius: 25px;">
</p>

<p align="center">
  <a href="https://github.com/DylanDevelops/aidentify">
      <h1 align="center">AIdentify</h1>
  </a>
</p>

<p align="center">
  <em>Through images, text, and more, learn to identify AI generated content in the real world!</em>
</p>
<p align="center">
  <a href="https://github.com/dylandevelops/aidentify/blob/main/LICENSE"><img alt="GitHub License" src="https://img.shields.io/github/license/dylandevelops/aidentify?style=for-the-badge"></a>
  <a href="https://www.codefactor.io/repository/github/dylandevelops/aidentify/overview/main"><img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/dylandevelops/aidentify?style=for-the-badge"></a>
  <a href="https://github.com/dylandevelops/aidentify/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/dylandevelops/aidentify?style=for-the-badge"></a>
  <a href="https://makeapullrequest.com/"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge"></a>
</p>

## Installation

Note: Before beginning the installation, note that the only way you can make changes to the project is to test your changes; however, you cannot test them. This flaw is due to the close integration with the backend, which means we don't have a public contributor instance that anyone can use. We may make this in the future. The following steps are only for maintainers of this project.

1. Run the following to make sure you are on the correct versions:

```bash
node -v # Should be v22.5.1
npm -v # Should be 10.8.3
npx -v # Should be 10.8.3
```

Note: If any of the versions do not match, please install the versions listed above. If you use `nvm`, you can run the following commands:

```bash
nvm install
nvm use
```

2. Install all node dependencies by running the following command in the project's root directory:

```bash
npm install
```

2. Start a development server of the backend by running the following command:

```bash
npx convex dev
```

Note: If this command does not work, you may be missing an .env.local file. You can read more about that by visiting [Environmental Variables](#environment-variables) section.

3. While keeping the old terminal running, open a new terminal and run a development server of the website by running the following command:

```bash
npm run dev
```

4. Open the website by visiting <http://localhost:3000> with your browser. When you make changes to a code file and save the file, the live preview will update on the url automatically.

Let @DylanDevelops know if you have any questions

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file if you don't already have them. Please contact [@DylanDevelops](https://www.github.com/dylandevelops) for how to get these.

1. `CONVEX_DEPLOYMENT`
2. `NEXT_PUBLIC_CONVEX_URL`
3. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
4. `CLERK_WEBHOOK_SECRET`

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Feedback

If you have any feedback, bug reports, or anything else, please create an [issue](https://github.com/dylandevelops/aidentify/issues).

## Authors

Made by the AIdentify Team for the GCI Initiative.

## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
