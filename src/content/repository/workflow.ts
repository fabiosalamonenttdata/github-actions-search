import * as v from "valibot"
import type { Repository } from "@/schema/repository"

const treeInfoSchema = v.object({
  entries: v.record(v.string(), v.unknown()),
})

export type WorkflowFile = {
  fileName: string
  displayName: string
}

/**
 * Extract the workflow name from YAML content
 * Looks for the "name:" field at the beginning of lines
 */
const extractWorkflowName = (yamlContent: string): string | null => {
  const lines = yamlContent.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    // Skip comments and empty lines
    if (trimmed.startsWith("#") || trimmed === "") {
      continue
    }

    // Match various formats:
    // name: Some Workflow Name
    // name: 'Some Name'
    // name: "Some Name"
    // name: Some Name # comment
    if (trimmed.toLowerCase().startsWith("name:")) {
      let extracted = trimmed.substring(5).trim() // Remove "name:" prefix

      // Remove quotes if present
      if (extracted.length > 0) {
        const firstChar = extracted[0]
        if (
          (firstChar === '"' && extracted.includes('"', 1)) ||
          (firstChar === "'" && extracted.includes("'", 1))
        ) {
          const endQuoteIndex = extracted.indexOf(firstChar, 1)
          extracted = extracted.substring(1, endQuoteIndex)
        } else {
          // Remove inline comments
          const commentIndex = extracted.indexOf("#")
          if (commentIndex !== -1) {
            extracted = extracted.substring(0, commentIndex).trim()
          }
        }
      }

      return extracted || null
    }
  }
  return null
}

/**
 * Fetch the workflow file content and extract its display name
 */
const fetchWorkflowDisplayName = async (
  repo: Repository,
  defaultBranch: string,
  fileName: string
): Promise<string> => {
  try {
    const url = `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/${defaultBranch}/.github/workflows/${fileName}`
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    })

    if (!response.ok) {
      console.warn(
        `[GitHub Actions Search] Failed to fetch ${fileName}: ${String(response.status)}`
      )
      return fileName // Fallback to filename if fetch fails
    }

    const content = await response.text()
    const extractedName = extractWorkflowName(content)

    if (extractedName) {
      console.debug(`[GitHub Actions Search] ${fileName} -> "${extractedName}"`)
    } else {
      console.warn(
        `[GitHub Actions Search] Could not extract name from ${fileName}, using filename`
      )
    }

    return extractedName ?? fileName
  } catch (error) {
    console.error(`[GitHub Actions Search] Error fetching ${fileName}:`, error)
    return fileName // Fallback to filename on error
  }
}

export const fetchWorkflowFiles = async (
  repo: Repository,
  defaultBranch: string
): Promise<WorkflowFile[]> => {
  const response = await fetch(
    `https://github.com/${repo.owner}/${repo.repo}/tree-commit-info/${defaultBranch}/.github/workflows`,
    {
      headers: {
        accept: "application/json",
      },
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  )

  const data: unknown = await response.json()
  const parsed = v.parse(treeInfoSchema, data)
  const fileNames = Object.keys(parsed.entries)

  console.log(
    `[GitHub Actions Search] Found ${String(fileNames.length)} workflow files:`,
    fileNames
  )

  // Fetch display names for all workflows in parallel
  const workflowFiles = await Promise.all(
    fileNames.map(async (fileName) => {
      const displayName = await fetchWorkflowDisplayName(
        repo,
        defaultBranch,
        fileName
      )
      return {
        fileName,
        displayName,
      }
    })
  )

  console.log(
    `[GitHub Actions Search] Loaded display names for ${String(workflowFiles.length)} workflows:`
  )

  return workflowFiles
}
