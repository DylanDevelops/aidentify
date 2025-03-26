const config = {
  providers: [
    {
      domain: process.env.CLERK_DOMAIN,
      applicationID: "convex",
    },
  ]};

export default config;