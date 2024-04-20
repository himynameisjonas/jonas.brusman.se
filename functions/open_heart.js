export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (request.method == "POST") {
    const emoji = ensureEmoji(await request.text());
    if (!id || !emoji) return new Response("not ok", { status: 500 });

    return storeEmoji(context, id, emoji);
  } else if (request.method == "GET") {
    return getEmojis(context, id);
  } else {
    return new Response("not ok", { status: 500 });
  }
}

async function getEmojis(context, id) {
  const emojis = await context.env.EMOJIS.list({ prefix: `${id}:` });
  let result = {};
  await Promise.all(
    emojis.keys.map(async (key) => {
      const count = await context.env.EMOJIS.get(key.name);
      result[key.name.split(":")[1]] = count || 0;
    }),
  );

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}

async function storeEmoji(context, id, emoji) {
  const key = `${id}:${emoji}`;

  const currentCount = Number((await context.env.EMOJIS.get(key)) || 0);
  await context.env.EMOJIS.put(key, currentCount + 1);
  await context.env.EMOJIS.put(`${id}:last`, new Date().toISOString());

  return new Response("ok");
}

function ensureEmoji(emoji) {
  const segments = Array.from(
    new Intl.Segmenter({ granularity: "grapheme" }).segment(emoji.trim()),
  );
  const parsedEmoji = segments.length > 0 ? segments[0].segment : null;

  if (/\p{Emoji}/u.test(parsedEmoji)) return parsedEmoji;
}
