import eleventyFetch from "@11ty/eleventy-fetch";

export default async function () {
  const wmMap = new Map();
  const wmURL = `https://webmention.io/api/mentions.jf2?domain=jonas.brusman.se&token=${process.env.WM_TOKEN}&per-page=1000`;

  try {
    const response = await eleventyFetch(wmURL, {
      directory: ".cache",
      duration: "1d",
      type: "json",
      fetchOptions: {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    });

    if (response && response.children && response.children.length > 0) {
      response.children.forEach((entry) => {
        let { "wm-property": type, "wm-target": target } = entry;

        if (type === "mention-of") {
          type = "in-reply-to";
        }

        const existing = wmMap.get(target);

        if (existing) {
          wmMap.set(target, {
            ...existing,
            [type]: (existing[type] ?? 0) + 1,
          });
        } else {
          wmMap.set(target, {
            [type]: 1,
          });
        }
      });
    }
  } catch (ex) {
    console.log(ex.message || ex);
  } finally {
    return wmMap;
  }
}
