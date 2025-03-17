import fs from "fs";
import dotenv from "dotenv";
import slugify from "slugify";

dotenv.config();

const HARDCOVER_API_URL = "https://api.hardcover.app/v1/graphql";
const USER_ID = 3665; // Your Hardcover user ID
const BOOKS_PER_PAGE = 50;

async function fetchBooksPage(offset = 0, limit = BOOKS_PER_PAGE) {
  console.log(`Fetching books page with offset ${offset}, limit ${limit}`);

  const query = `
    {
      list_books(
        where: { user_books: { user_id: { _eq: ${USER_ID} } } }
        distinct_on: book_id
        limit: ${limit}
        offset: ${offset}
      ) {
        book {
          id
          title
          subtitle
          description
          slug
          pages
          release_date
          release_year

          contributions {
            author {
              name
            }
          }

          image {
            url
          }

          book_series {
            series {
              name
              id
            }
            position
          }

          taggings {
            tag {
              tag
              tag_category {
                category
              }
            }
          }
        }

        user_books(where: { user_id: { _eq: ${USER_ID} } }) {
          edition {
            isbn_10
            isbn_13

            contributions {
              author {
                name
              }
            }
          }
          date_added
          user_book_reads {
            finished_at
            started_at
            paused_at
            progress
          }
        }
      }
    }
  `;

  const response = await fetch(HARDCOVER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HARDCOVER_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  if (data.errors) {
    console.error("GraphQL Errors:", data.errors);
    return [];
  }

  return data.data.list_books;
}

async function fetchAllBooks() {
  let offset = 0;
  let allBooks = [];
  let booksPage;

  do {
    booksPage = await fetchBooksPage(offset);
    allBooks = allBooks.concat(booksPage);
    offset += BOOKS_PER_PAGE;

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  } while (booksPage.length === BOOKS_PER_PAGE);

  console.log(`Fetched ${allBooks.length} books total`);
  return allBooks;
}

function formatBookData(books) {
  return books.map((item) => {
    const { book, user_books } = item;

    // Get the first user_book entry (should only be one per book for a given user)
    const userBook = user_books[0];

    // Format authors from the book
    const authors = book.contributions
      .filter((c) => c.author && c.author.name)
      .map((c) => c.author.name);

    // Format series info if available
    const series = book.book_series.map((s) => ({
      id: s.series.id,
      name: s.series.name,
      position: s.position,
    }));

    // Format tags by category
    const tagsByCategory = {};
    book.taggings.forEach((t) => {
      if (t.tag && t.tag.tag) {
        const category = t.tag.tag_category?.category || "Uncategorized";

        if (!tagsByCategory[category]) {
          tagsByCategory[category] = [];
        }

        tagsByCategory[category].push(t.tag.tag);
      }
    });

    // Flatten tags for simple access
    const tags = book.taggings
      .filter((t) => t.tag && t.tag.tag)
      .map((t) => t.tag.tag);

    // Get ISBN from edition
    const isbn10 = userBook.edition?.isbn_10;
    const isbn13 = userBook.edition?.isbn_13;

    // Get edition authors if available
    const editionAuthors =
      userBook.edition?.contributions
        ?.filter((c) => c.author && c.author.name)
        .map((c) => c.author.name) || [];

    // Combine authors, removing duplicates
    const allAuthors = [...new Set([...authors, ...editionAuthors])];

    // Format reading history - sorted from newest to oldest
    const readingHistory = userBook.user_book_reads
      .map((read) => ({
        started: read.started_at,
        finished: read.finished_at,
        paused: read.paused_at,
        progress: read.progress,
      }))
      .sort((a, b) => {
        // Sort by started date, most recent first
        const dateA = a.started ? new Date(a.started) : new Date(0);
        const dateB = b.started ? new Date(b.started) : new Date(0);
        return dateB - dateA;
      });

    // Generate a permalink slug - use the book's slug if available
    const slug =
      book.slug ||
      slugify(`${book.title} ${allAuthors.join(" ")}`, {
        lower: true,
        strict: true,
      }).substring(0, 100); // Limit slug length

    return {
      id: book.id,
      title: book.title,
      subtitle: book.subtitle,
      description: book.description,
      slug: book.slug || slug,
      pages: book.pages,
      releaseDate: book.release_date,
      releaseYear: book.release_year,

      // Author information
      authors: allAuthors,

      // Cover image
      coverImage: book.image?.url,

      // Series information
      series,

      // Tags information
      tags,
      tagsByCategory,

      // Edition information
      isbn10,
      isbn13,

      // User-specific data
      dateAdded: userBook.date_added,

      // Reading history
      readingHistory,

      // Reading status calculation based on reading history
      status: calculateReadingStatus(readingHistory),

      // Generated permalink for your site
      permalink: `/books/${slug}/`,
    };
  });
}

// Helper function to determine reading status based on reading history
function calculateReadingStatus(readingHistory) {
  if (!readingHistory || readingHistory.length === 0) {
    return "to-read";
  }

  // Check the most recent reading session
  const latestSession = readingHistory[0];

  if (latestSession.finished) {
    return "read";
  }

  if (
    latestSession.started &&
    !latestSession.finished &&
    !latestSession.paused
  ) {
    return "reading";
  }

  if (latestSession.paused) {
    return "paused";
  }

  return "to-read";
}

async function fetchAndSaveBooks() {
  try {
    const books = await fetchAllBooks();
    const formattedBooks = formatBookData(books);

    // Create data directory if it doesn't exist
    const dataDir = "./src/site/_data";
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to JSON file
    fs.writeFileSync(
      `${dataDir}/books.json`,
      JSON.stringify(formattedBooks, null, 2),
    );

    console.log(
      `Successfully saved ${formattedBooks.length} books to books.json`,
    );
  } catch (error) {
    console.error("Error fetching or saving books:", error);
  }
}

fetchAndSaveBooks();
