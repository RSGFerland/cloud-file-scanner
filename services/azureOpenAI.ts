// Azure OpenAI integration for OpsVault

export const getOpsAnalysis = async (stats: any) => {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

  if (!endpoint || !apiKey || !deployment) {
    throw new Error("Azure OpenAI environment variables are not set.");
  }

  const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2023-03-15-preview`;

  const body = {
    messages: [
      {
        role: "system",
        content: "You are the OpsVault Lead Architect. Analyze these IT stats and provide a concise 2-sentence strategy for space reclamation and vault health optimization. Use a professional yet slightly encouraging tone."
      },
      {
        role: "user",
        content: `Stats: ${JSON.stringify(stats)}`
      }
    ],
    max_tokens: 150,
    temperature: 0.7
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error("Azure OpenAI request failed");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Vault health is stable. Proceed with regular archival cycles.";
};

{
  "compilerOptions": {
    "types": ["node"]
  }
}

