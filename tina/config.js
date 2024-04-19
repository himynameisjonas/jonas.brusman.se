import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-s3");
      return pack.TinaCloudS3MediaStore;
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/site/blog_posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              parse: (value) => value && value.format("YYYY-MM-DD"),
            },
          },
          {
            label: "Photos",
            name: "photos",
            type: "image",
            list: true,
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            label: "Syndications",
            name: "syndications",
            type: "string",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        defaultItem: () => {
          return {
            date: new Date(),
          };
        },
        ui: {
          filename: {
            slugify: (values) => {
              const date = new Date(values.date).toISOString().substring(0, 10);
              const title = values.title
                ?.replace(/ /g, "-")
                .replace(/[^a-zA-Z0-9-]/g, "")
                .toLowerCase();
              return [date, title].filter(Boolean).join("-");
            },
          },
        },
      },
    ],
  },
});
