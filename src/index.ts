#!/usr/bin/env node

/**
 * MCP server implementation that provides web search capabilities via Serper API.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { SerperClient } from "./services/serper-client.js";
import { SerperSearchTools } from "./tools/search-tool.js";
import { SerperPrompts } from "./prompts/index.js";

// Initialize Serper client with API key from environment
const serperApiKey = process.env.SERPER_API_KEY;
if (!serperApiKey) {
  throw new Error("SERPER_API_KEY environment variable is required");
}

// Create Serper client, search tool, and prompts
const serperClient = new SerperClient(serperApiKey);
const searchTools = new SerperSearchTools(serperClient);
const prompts = new SerperPrompts(searchTools);

// Create MCP server
const server = new Server(
  {
    name: "Serper MCP Server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
      prompts: {}
    },
  }
);

/**
 * Handler that lists available tools.
 * Exposes a single "webSearch" tool for performing web searches.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  // Define input schema for search tool
  const searchInputSchema = {
    type: "object",
    properties: {
      q: {
        type: "string",
        description: "Search query with optional Google operators. Examples: 'machine learning', 'site:github.com react hooks', 'filetype:pdf deep learning', 'site:linkedin.com/in/ \"software engineer\" San Francisco', '\"exact phrase\" -exclude site:specific.com'"
      },
      gl: {
        type: "string",
        description: "Region code for search results in ISO 3166-1 alpha-2 format (e.g., 'us' for United States, 'gb' for United Kingdom, 'de' for Germany). Default: 'us'"
      },
      hl: {
        type: "string",
        description: "Language code for search results in ISO 639-1 format (e.g., 'en' for English, 'es' for Spanish, 'fr' for French). Default: 'en'"
      },
      location: {
        type: "string",
        description: "Optional location for search results (e.g., 'SoHo, New York, United States', 'California, United States')"
      },
      num: {
        type: "number",
        description: "Number of results to return (default: 10)"
      },
      tbs: {
        type: "string",
        description: "Time-based search filter ('qdr:h' for past hour, 'qdr:d' for past day, 'qdr:w' for past week, 'qdr:m' for past month, 'qdr:y' for past year)"
      },
      page: {
        type: "number",
        description: "Page number of results to return (default: 1)"
      },
      autocorrect: {
        type: "boolean",
        description: "Whether to autocorrect spelling in query"
      },
      // Advanced search operators
      site: {
        type: "string",
        description: "Limit results to specific domain. Common uses: 'linkedin.com/in/' for people, 'linkedin.com/company/' for companies, 'github.com' for code, 'stackoverflow.com' for technical Q&A, 'arxiv.org' for research papers"
      },
      filetype: {
        type: "string",
        description: "Limit to specific file types (e.g., 'pdf', 'doc', 'xls')"
      },
      inurl: {
        type: "string",
        description: "Search for pages with word in URL (e.g., 'download', 'tutorial')"
      },
      intitle: {
        type: "string",
        description: "Search for pages with word in title (e.g., 'review', 'how to')"
      },
      related: {
        type: "string",
        description: "Find similar websites (e.g., 'github.com', 'stackoverflow.com')"
      },
      cache: {
        type: "string",
        description: "View Google's cached version of a specific URL (e.g., 'example.com/page')"
      },
      before: {
        type: "string",
        description: "Date before in YYYY-MM-DD format (e.g., '2024-01-01')"
      },
      after: {
        type: "string",
        description: "Date after in YYYY-MM-DD format (e.g., '2023-01-01')"
      },
      exact: {
        type: "string",
        description: "Exact phrase match. Note: You can also use quotes directly in the query (e.g., '\"machine learning\"' in the q parameter)"
      },
      exclude: {
        type: "string",
        description: "Terms to exclude from results as comma-separated string. Note: You can also use minus operator directly in query (e.g., '-spam -ads' in the q parameter)"
      },
      or: {
        type: "string",
        description: "Alternative terms as comma-separated string. Note: You can also use OR operator directly in query (e.g., 'React OR Vue OR Angular' in the q parameter)"
      }
    },
    required: ["q"],
  };

  // Return list of tools with input schemas
  return {
    tools: [
      {
        name: "google_search",
        description:
          "Advanced Google search tool that supports complex queries with operators like site:, filetype:, intitle:, before:/after:, and more. Perfect for finding LinkedIn profiles (site:linkedin.com/in/), companies (site:linkedin.com/company/), technical documentation, research papers, and specific content. Can combine multiple operators for precise results. Examples: 'site:linkedin.com/in/ \"data scientist\" Python', 'site:github.com machine learning stars:>100', 'filetype:pdf AI research after:2023-01-01'.",
        inputSchema: searchInputSchema,
      },
      {
        name: "scrape",
        description:
          "Tool to scrape a webpage and retrieve the text and, optionally, the markdown content. It will retrieve also the JSON-LD metadata and the head metadata.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "The URL of the webpage to scrape.",
            },
            includeMarkdown: {
              type: "boolean",
              description: "Whether to include markdown content.",
              default: false,
            },
          },
          required: ["url"],
        },
      },
    ],
  };
});

/**
 * Handler for the webSearch tool.
 * Performs a web search using Serper API and returns results.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "google_search": {
      const {
        q,
        gl,
        hl,
        location,
        num,
        tbs,
        page,
        autocorrect,
        // Advanced search parameters
        site,
        filetype,
        inurl,
        intitle,
        related,
        cache,
        before,
        after,
        exact,
        exclude,
        or
      } = request.params.arguments || {};

      if (!q) {
        throw new Error(
          "Search query (q) is required"
        );
      }
      
      // Provide defaults for region and language if not specified
      const region = gl || 'us';
      const language = hl || 'en';

      try {
        const result = await searchTools.search({
          q: String(q),
          gl: String(region),
          hl: String(language),
          location: location as string | undefined,
          num: num as number | undefined,
          tbs: tbs as "qdr:h" | "qdr:d" | "qdr:w" | "qdr:m" | "qdr:y" | undefined,
          page: page as number | undefined,
          autocorrect: autocorrect as boolean | undefined,
          // Advanced search parameters
          site: site as string | undefined,
          filetype: filetype as string | undefined,
          inurl: inurl as string | undefined,
          intitle: intitle as string | undefined,
          related: related as string | undefined,
          cache: cache as string | undefined,
          before: before as string | undefined,
          after: after as string | undefined,
          exact: exact as string | undefined,
          exclude: exclude as string | undefined,
          or: or as string | undefined
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        throw new Error(`Search failed: ${error}`);
      }
    }

    case "scrape": {
      const url = request.params.arguments?.url as string;
      const includeMarkdown = request.params.arguments
        ?.includeMarkdown as boolean;
      const result = await searchTools.scrape({ url, includeMarkdown });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error("Unknown tool");
  }
});

// Handle prompts/list requests
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return prompts.listPrompts();
});

// Handle prompts/get requests
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  return prompts.getPrompt(request.params.name, request.params.arguments || {});
});

/**
 * Start the server using stdio transport.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
