<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared workspace presentation in `src/components/upfounder` and content pages at `/`, `/projects`, and `/editor` so navigation and previews remain consistent.
- Keep this redesign frontend-only with explicit preview messaging for unconnected AI, account, sharing, and publishing actions; no real backend functionality is implied.
- Define visual roles centrally in `src/styles.css` and use the shared Button for interactive controls to preserve the design system.
