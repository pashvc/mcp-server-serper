# Serper Search and Scrape MCP Server
[![smithery badge](https://smithery.ai/badge/@marcopesani/mcp-server-serper)](https://smithery.ai/server/@marcopesani/mcp-server-serper)

A TypeScript-based MCP server that provides web search and webpage scraping capabilities using the Serper API. This server integrates with Claude Desktop to enable powerful web search and content extraction features.

<a href="https://glama.ai/mcp/servers/5zk327i0pj">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/5zk327i0pj/badge" alt="serper-search-scrape-mcp-server MCP server" />
</a>

## Features

### Tools

- `google_search` - Perform advanced Google searches with full operator support
  - Rich search results including organic results, knowledge graph, "people also ask", and related searches
  - Supports region (default: 'us') and language (default: 'en') targeting
  - Advanced search operators directly in the query:
    - `" "`: Exact phrase matching
    - `site:`: Limit to specific domain (e.g., `site:linkedin.com/in/` for people)
    - `-`: Exclude terms (e.g., `-spam -ads`)
    - `OR` or `|`: Alternative terms
    - `filetype:` or `ext:`: Specific file types
    - `intitle:` / `allintitle:`: Words in page title
    - `inurl:` / `allinurl:`: Words in URL
    - `before:` / `after:`: Date filtering (YYYY-MM-DD format)
    - `*`: Wildcard for any word
    - `#..#`: Number ranges
    - `related:`: Find similar sites
    - `AROUND(X)`: Proximity search
  
- `scrape` - Extract content from web pages
  - Get plain text and optional markdown content
  - Includes JSON-LD and head metadata
  - Preserves document structure

### Example Queries

#### LinkedIn Searches
```
# Find people
site:linkedin.com/in/ "data scientist" Python "San Francisco"
site:linkedin.com/in/ "software engineer" (Google OR Meta) -recruiter

# Find companies  
site:linkedin.com/company/ fintech "series B" 
site:linkedin.com/company/ "artificial intelligence" healthcare
```

#### Technical Searches
```
# Stack Overflow solutions
site:stackoverflow.com "TypeError" pandas dataframe

# GitHub repositories
site:github.com "machine learning" README.md stars:>100

# Documentation
site:docs.python.org asyncio tutorial
```

#### Research & Academic
```
# Research papers
filetype:pdf "deep learning" medical after:2023-01-01
site:arxiv.org "transformer architecture" "computer vision"

# Academic content
site:edu "climate change" research "peer reviewed"
```

#### Advanced Combinations
```
# Exclude noise
python tutorial -youtube -video -course -udemy

# Multiple sites
(site:github.com OR site:gitlab.com) "react hooks" example

# Date and type filters
"machine learning" news after:2024-01-01 -opinion -sponsored
```

## Requirements

- Node.js >= 18
- Serper API key (set as `SERPER_API_KEY` environment variable)

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

Run tests:
```bash
npm test                  # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:integration # Run integration tests
```

### Environment Variables

Create a `.env` file in the root directory:

```
SERPER_API_KEY=your_api_key_here
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Installation

### Installing via Smithery

To install Serper Search and Scrape for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@marcopesani/mcp-server-serper):

```bash
npx -y @smithery/cli install @marcopesani/mcp-server-serper --client claude
```

### Claude Desktop

Add the server config at:
- MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "serper-search": {
      "command": "npx",
      "args": ["-y", "serper-search-scrape-mcp-server"],
      "env": {
        "SERPER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cline

1. Open the Cline extension settings
2. Open "MCP Servers" tab
3. Click on "Configure MCP Servers"
4. Add the server config:

```json
{
  "mcpServers": {
    "github.com/marcopesani/mcp-server-serper": {
      "command": "npx",
      "args": ["-y", "serper-search-scrape-mcp-server"],
      "env": {
        "SERPER_API_KEY": "your_api_key_here"
      },
      "disabled": false,
      "autoApprove": ["google_search", "scrape"]
    }
  }
}
```

Additional Cline configuration options:
- `disabled`: Set to `false` to enable the server
- `autoApprove`: List of tools that don't require explicit approval for each use

### Cursor

1. Open the Cursor settings
2. Open "Features" settings
3. In the "MCP Servers" section, click on "Add new MCP Server"
4. Choose a name, and select "command" as "Type"
5. In the "Command" field, enter the following:

```
env SERPER_API_KEY=your_api_key_here npx -y serper-search-scrape-mcp-server
```

### Docker

You can also run the server using Docker. First, build the image:

```bash
docker build -t mcp-server-serper .
```

Then run the container with your Serper API key:

```bash
docker run -e SERPER_API_KEY=your_api_key_here mcp-server-serper
```

Alternatively, if you have your environment variables in a `.env` file:

```bash
docker run --env-file .env mcp-server-serper
```

For development, you might want to mount your source code as a volume:

```bash
docker run -v $(pwd):/app --env-file .env mcp-server-serper
```

Note: Make sure to replace `your_api_key_here` with your actual Serper API key.