import { observeUrlChange } from "@/content/util/url-change-event"
import { parseRepository, type Repository } from "@/schema/repository"
import { initializeApp, cleanApp } from "./initialize-app"

let currentRepo: Repository | undefined

observeUrlChange()

window.addEventListener("urlChange", () => {
  currentRepo = parseRepository(window.location.href)

  if (currentRepo === undefined) {
    cleanApp()
    return
  }
  initializeApp(currentRepo)
})

// GitHub's React UI renders the sidebar late and may re-render it (e.g. when
// collapsing/expanding), dropping our root: re-mount whenever it goes missing.
new MutationObserver(() => {
  if (currentRepo && !document.getElementById("crx-root")) {
    initializeApp(currentRepo)
  }
}).observe(document.body, { childList: true, subtree: true })
