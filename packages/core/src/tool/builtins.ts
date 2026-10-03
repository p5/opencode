export * as BuiltInTools from "./builtins"

import { makeLocationNode } from "../effect/app-node"
import { LayerNode } from "../effect/layer-node"
import { Layer } from "effect"
import { BashTool } from "./bash"
import { ApplyPatchTool } from "./apply-patch"
import { EditTool } from "./edit"
import { GlobTool } from "./glob"
import { GrepTool } from "./grep"
import { QuestionTool } from "./question"
import { ReadTool } from "./read"
import { SkillTool } from "./skill"
import { TodoWriteTool } from "./todowrite"
import { WebFetchTool } from "./webfetch"
import { WebSearchTool } from "./websearch"
import { WriteTool } from "./write"

/**
 * Composes only the shipped Location-scoped built-in tool transforms.
 * Each tool retains its implementation and focused tests independently. Dynamic
 * MCP and plugin tools later use separate scoped canonical registrations, while
 * provider/model filtering belongs to a future materialization phase rather
 * than this static list. The caller intentionally supplies shared Location
 * services once to this merged set.
 *
 * TODO: Port the remaining launch-follow-up leaves deliberately: edit fuzzy
 * parity, task, LSP,
 * repo_clone, repo_overview, plan_exit, and Rune/code mode. Keep MCP and plugin
 * transforms separate from this static built-in list.
 */
const tools = {
  apply_patch: ApplyPatchTool.node,
  bash: BashTool.node,
  edit: EditTool.node,
  glob: GlobTool.node,
  grep: GrepTool.node,
  question: QuestionTool.node,
  read: ReadTool.node,
  skill: SkillTool.node,
  todowrite: TodoWriteTool.node,
  webfetch: WebFetchTool.node,
  websearch: WebSearchTool.node,
  write: WriteTool.node,
}

export const node = makeLocationNode({
  name: "built-in-tools",
  layer: Layer.empty,
  deps: [
    ApplyPatchTool.node,
    BashTool.node,
    EditTool.node,
    GlobTool.node,
    GrepTool.node,
    QuestionTool.node,
    ReadTool.node,
    SkillTool.node,
    TodoWriteTool.node,
    WebFetchTool.node,
    WebSearchTool.node,
    WriteTool.node,
  ],
})

export const select = (names: readonly string[]) =>
  LayerNode.group(Object.entries(tools).flatMap(([name, node]) => (names.includes(name) ? [node] : [])))
