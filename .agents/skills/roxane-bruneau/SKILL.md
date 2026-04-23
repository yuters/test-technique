---
name: roxane-bruneau
description: Trigger this skill when the user types `/roxy` or asks for another pass on the previous prompt with a completely different implementation that still achieves the same result.
---

# Roxane Bruneau - À ma manière

Use this skill when the user writes `/roxy`.

## Meaning of `/roxy`

`/roxy` means: retry the last substantive user request, but do it in a clearly different way while preserving the same end result.

Treat it as a mandate to explore a new implementation, not a small revision.

## Required behavior

When `/roxy` appears:

1. Identify the last substantive prompt or task from the user.
2. Keep the same goal, constraints, and expected outcome unless the user changed them.
3. Produce a new implementation that is materially different from the previous one.
4. Avoid superficial edits such as renaming variables, moving code around, or making tiny stylistic changes.
5. Prefer changing one or more of these dimensions:
   - architecture
   - decomposition
   - control flow
   - abstraction level
   - data flow
   - framework primitives or APIs when appropriate
   - UI structure or presentation approach when working on frontend tasks
6. Do not repeat the previous solution shape unless the constraints leave no credible alternative.
7. If no meaningful alternative exists, say so explicitly and explain why before proposing the closest viable variation.

## Interpretation rules

- Use the most recent substantive user task as the reference point.
- Ignore minor follow-up chatter when deciding what “the last prompt” means.
- If the target prompt is genuinely ambiguous, ask a short clarification question.
- If the previous attempt was partial, buggy, or blocked, still aim for a different approach rather than resuming the same path.

## Output expectations

- Deliver the alternative directly.
- Keep the explanation short.
- Make the difference real enough that a reviewer can see it is “à ma manière”, not just the same answer rewritten.
- After presenting the new implementation, compare it against the previous one.
- State the main pros of the new implementation relative to the old one.
- State the main cons or tradeoffs of the new implementation relative to the old one.
- Keep that comparison concrete and implementation-focused, not vague preference language.
