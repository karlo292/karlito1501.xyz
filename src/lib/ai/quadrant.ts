import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { QdrantClient } from "@qdrant/js-client-rest";

const API_KEY = process.env.QDRANT_API_KEY;
const URL = process.env.QDRANT_URL;
const COLLECTION_NAME = process.env.QDRANT_DB_COLLECTION_NAME;

if (!URL || !API_KEY || !COLLECTION_NAME) {
  throw new Error(
    "Qdrant URL, API key, and collection name must be set in environment variables",
  );
}

const qdrantClient = new QdrantClient({
  url: URL,
  apiKey: API_KEY,
});

const collectionName = COLLECTION_NAME;

// Keyword-based search using Qdrant's scroll/filter
export async function searchByKeyword(searchTerm: string, limit = 10) {
  try {
    const results = await qdrantClient.scroll(collectionName, {
      filter: {
        should: [
          {
            key: "content",
            match: { text: searchTerm },
          },
          {
            key: "title",
            match: { text: searchTerm },
          },
        ],
      },
      limit,
      with_payload: true,
    });
    return results.points;
  } catch (error) {
    console.error("Error searching by keyword:", error);
    throw new Error("Failed to search by keyword");
  }
}

// Create collection for keyword-based storage (no vectors needed)
export const getEmbeddingCollections = async () => {
  const collectionExists = await qdrantClient.collectionExists(collectionName);

  if (collectionExists.exists) {
    await qdrantClient.deleteCollection(collectionName);
    console.log(`Collection ${collectionName} deleted successfully.`);
  }

  // Create collection without vectors for keyword-only search
  return qdrantClient.createCollection(collectionName, {
    vectors: {
      size: 1, // Minimum size, not used for keyword search
      distance: "Cosine",
    },
  });
};

// Add documents for keyword search
export async function addDocuments(
  documents: Array<{
    id: string;
    content: string;
    title?: string;
    metadata?: Record<string, unknown>;
  }>,
) {
  const points = documents.map((doc, index) => ({
    id: index,
    vector: [0], // Dummy vector since we're using keyword search
    payload: {
      content: doc.content,
      title: doc.title || "",
      ...doc.metadata,
    },
  }));

  return qdrantClient.upsert(collectionName, { points });
}

export { qdrantClient };
