import { GetPromptRequestSchema, ListPromptsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { SerperSearchTools } from "../tools/search-tool.js";
import { GOOGLE_OPERATORS_GUIDE, SEARCH_QUERY_EXAMPLES } from "./google-operators-guide.js";

interface PromptArgument {
  name: string;
  description: string;
  required?: boolean;
}

interface Prompt {
  name: string;
  description: string;
  arguments?: PromptArgument[];
}

const PROMPTS: Record<string, Prompt> = {
  "google-search-guide": {
    name: "google-search-guide",
    description: "Complete guide to Google advanced search operators with examples for LinkedIn searches, technical documentation, research papers, and more",
    arguments: []
  },
  "smart-search": {
    name: "smart-search",
    description: "Craft an optimized Google search query using advanced operators based on your search intent",
    arguments: [
      {
        name: "search_intent",
        description: "What you want to find (e.g., 'LinkedIn profiles of ML engineers in SF', 'Python error solutions', 'Recent AI research papers')",
        required: true
      },
      {
        name: "search_type",
        description: "Type of search: linkedin_people, linkedin_companies, technical, research, jobs, news, documentation",
        required: false
      },
      {
        name: "constraints",
        description: "Any constraints like date range, file type, specific sites, exclusions",
        required: false
      }
    ]
  },
  "research-topic": {
    name: "research-topic",
    description: "Guide comprehensive research on a topic using advanced search techniques",
    arguments: [
      {
        name: "topic",
        description: "Main topic to research",
        required: true
      },
      {
        name: "depth",
        description: "Research depth (basic or detailed)",
        required: false
      },
      {
        name: "focus_areas",
        description: "Specific areas to focus research on",
        required: false
      }
    ]
  },
  "compare-sources": {
    name: "compare-sources",
    description: "Compare information from multiple sources on a topic",
    arguments: [
      {
        name: "topic",
        description: "Topic to compare sources for",
        required: true
      },
      {
        name: "min_sources",
        description: "Minimum number of sources to compare",
        required: false
      }
    ]
  },
  "fact-check": {
    name: "fact-check",
    description: "Verify a claim across multiple authoritative sources",
    arguments: [
      {
        name: "claim",
        description: "Claim to verify",
        required: true
      },
      {
        name: "thoroughness",
        description: "Verification thoroughness (quick or thorough)",
        required: false
      }
    ]
  },
  "technical-search": {
    name: "technical-search",
    description: "Focused technical and programming search",
    arguments: [
      {
        name: "query",
        description: "Technical query to search for",
        required: true
      },
      {
        name: "tech_stack",
        description: "Relevant technologies to focus on",
        required: false
      },
      {
        name: "content_type",
        description: "Type of content (docs, tutorials, issues)",
        required: false
      }
    ]
  }
};

export class SerperPrompts {
  constructor(private searchTools: SerperSearchTools) {}

  async listPrompts() {
    return {
      prompts: Object.values(PROMPTS)
    };
  }

  async getPrompt(name: string, args: Record<string, any>) {
    const prompt = PROMPTS[name];
    if (!prompt) {
      throw new Error(`Prompt not found: ${name}`);
    }

    switch (name) {
      case "google-search-guide":
        return this.getGoogleSearchGuidePrompt();
      case "smart-search":
        return this.getSmartSearchPrompt(args);
      case "research-topic":
        return this.getResearchTopicPrompt(args);
      case "compare-sources":
        return this.getCompareSourcesPrompt(args);
      case "fact-check":
        return this.getFactCheckPrompt(args);
      case "news-analysis":
        return this.getNewsAnalysisPrompt(args);
      case "technical-search":
        return this.getTechnicalSearchPrompt(args);
      default:
        throw new Error("Prompt implementation not found");
    }
  }

  private async getGoogleSearchGuidePrompt() {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Here's a comprehensive guide to Google advanced search operators:\n\n${GOOGLE_OPERATORS_GUIDE}\n\nExample queries for different use cases:\n${JSON.stringify(SEARCH_QUERY_EXAMPLES, null, 2)}`
          }
        }
      ]
    };
  }

  private async getSmartSearchPrompt(args: Record<string, any>) {
    const { search_intent, search_type, constraints } = args;
    
    let examples = "";
    if (search_type && SEARCH_QUERY_EXAMPLES[search_type as keyof typeof SEARCH_QUERY_EXAMPLES]) {
      examples = `\n\nRelevant examples for ${search_type}:\n${SEARCH_QUERY_EXAMPLES[search_type as keyof typeof SEARCH_QUERY_EXAMPLES].join('\n')}`;
    }

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Help me craft an optimized Google search query for: ${search_intent}\n\nSearch type: ${search_type || 'general'}\nConstraints: ${constraints || 'none'}${examples}\n\nProvide:\n1. The optimized search query using advanced operators\n2. Explanation of operators used\n3. Alternative query variations\n4. Tips for refining results`
          }
        }
      ]
    };
  }

  private async getResearchTopicPrompt(args: Record<string, any>) {
    const { topic, depth = "basic", focus_areas = [] } = args;
    const focusAreasText = focus_areas.length > 0 
      ? `\nFocus specifically on these areas: ${focus_areas.join(", ")}`
      : "";
    const depthText = depth === "detailed" 
      ? "\nProvide detailed analysis and comprehensive coverage."
      : "\nProvide a basic overview and key points.";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Research the topic: ${topic}${focusAreasText}${depthText}\n\nUse advanced Google search operators to find:\n- Recent authoritative sources (after:2023-01-01)\n- Academic papers (filetype:pdf site:edu OR site:arxiv.org)\n- Expert discussions (site:reddit.com OR site:news.ycombinator.com)\n- Official documentation (site:docs.* OR site:github.com)\n\nOrganize the findings into:\n1. Overview\n2. Key Points\n3. Supporting Evidence\n4. Expert Opinions\n5. Conclusions`
          }
        }
      ]
    };
  }

  private async getCompareSourcesPrompt(args: Record<string, any>) {
    const { topic, min_sources = 3 } = args;
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Compare at least ${min_sources} different sources on: ${topic}\n\nAnalyze:\n1. Points of Agreement\n2. Differing Perspectives\n3. Source Credibility\n4. Supporting Evidence\n5. Synthesis of Findings`
          }
        }
      ]
    };
  }

  private async getFactCheckPrompt(args: Record<string, any>) {
    const { claim, thoroughness = "quick" } = args;
    const depth = thoroughness === "thorough"
      ? "\nPerform a comprehensive fact-check using multiple authoritative sources."
      : "\nQuickly verify the main points using reliable sources.";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Fact check this claim: "${claim}"${depth}\n\nProvide:\n1. Verification Status\n2. Supporting Evidence\n3. Authoritative Sources\n4. Context\n5. Final Assessment`
          }
        }
      ]
    };
  }

  private async getNewsAnalysisPrompt(args: Record<string, any>) {
    const { topic, time_range, perspective = "balanced" } = args;
    const timeFilter = time_range ? `\nFocus on coverage from: ${time_range}` : "";
    const perspectiveGuide = perspective === "all"
      ? "\nInclude all viewpoints and perspectives in the analysis."
      : "\nFocus on balanced, factual coverage from reliable sources.";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Analyze news coverage of: ${topic}${timeFilter}${perspectiveGuide}\n\nProvide:\n1. Coverage Overview\n2. Main Narratives\n3. Different Perspectives\n4. Potential Biases\n5. Key Takeaways`
          }
        }
      ]
    };
  }

  private async getTechnicalSearchPrompt(args: Record<string, any>) {
    const { query, tech_stack = [], content_type = "all" } = args;
    const techContext = tech_stack.length > 0
      ? `\nFocus on: ${tech_stack.join(", ")}`
      : "";
    const contentFocus = content_type !== "all"
      ? `\nPrioritize ${content_type} in the results.`
      : "";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Technical search for: ${query}${techContext}${contentFocus}\n\nUse these search strategies:\n- Stack Overflow solutions: site:stackoverflow.com "${query}"\n- GitHub examples: site:github.com "${query}" (README.md OR example)\n- Official docs: site:docs.* "${query}"\n- Recent tutorials: "${query}" tutorial after:2023-01-01 -video\n\nOrganize results into:\n1. Best Practices\n2. Implementation Examples\n3. Common Issues & Solutions\n4. Documentation References\n5. Community Insights`
          }
        }
      ]
    };
  }
}
