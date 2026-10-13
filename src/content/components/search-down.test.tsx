import { setTimeout } from "node:timers/promises"
import { Profiler } from "react"
import { createRoot } from "react-dom/client"
import { afterEach, describe, expect, it } from "vitest"
import { SearchDropdown } from "@/content/components/search-down"
import { MockRepositoryProvider } from "@/content/repository"
import {
  LocalStorageProvider,
  inMemoryStorage,
} from "@/content/util/local-storage"
import { TranslationProvider } from "@/content/util/translation-provider"

describe("SearchDropdown", () => {
  let unmount = () => {}
  afterEach(() => {
    unmount()
  })

  it("stops re-rendering once settled", async () => {
    let commits = 0
    const container = document.createElement("div")
    const root = createRoot(container)
    unmount = () => {
      root.unmount()
    }

    // Rendered outside act() so a render loop shows up as growing commits instead of hanging
    root.render(
      <Profiler
        id="search"
        onRender={() => {
          commits++
        }}
      >
        <TranslationProvider>
          <LocalStorageProvider storage={inMemoryStorage()}>
            <MockRepositoryProvider
              repository={{
                fetchBranches: () =>
                  Promise.resolve({
                    payload: {
                      branches: {
                        default: {
                          name: "main",
                          isDefault: true,
                          author: { name: "o" },
                        },
                      },
                    },
                  }),
                fetchWorkflowFiles: () =>
                  Promise.resolve([
                    { fileName: "a.yaml", displayName: "a.yaml" },
                  ]),
                fetchWorkflowDisplayName: () => Promise.resolve("A"),
              }}
            >
              <SearchDropdown repo={{ owner: "o", repo: "r" }} />
            </MockRepositoryProvider>
          </LocalStorageProvider>
        </TranslationProvider>
      </Profiler>
    )

    await setTimeout(500)
    const settled = commits
    await setTimeout(200)

    expect(container.querySelector("button")).not.toBeNull()
    expect(commits).toBe(settled)
  })
})
