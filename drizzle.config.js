/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./config/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://accounts:1fUYBQczhA2x@ep-delicate-moon-a5u5ks4r.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require',
    }
  };