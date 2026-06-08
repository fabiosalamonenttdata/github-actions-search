import * as v from "valibot"
import type { Repository } from "@/schema/repository"

const treeInfoSchema = v.object({
  entries: v.record(v.string(), v.unknown()),
})

export const fetchWorkflowFiles = async (
  repo: Repository,
  defaultBranch: string
): Promise<string[]> => {
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

  return await response.json().then((data: unknown) => {
    const parsed = v.parse(treeInfoSchema, data)
    const workflowFiles = Object.keys(parsed.entries)
    console.log(
      `[GitHub Actions Search] Found ${String(workflowFiles.length)} workflow files:`,
      workflowFiles
    )
    return workflowFiles
  })
}
