# Linting Markdown

- [ ] Headers are misformatted
    Sometimes they're bolded or italicized vs. being demarcated as Headers. They also might have the wrong Heading level. For ex, this code block:

    ```md{1,3}
    ## Game Thread:

    **General:**

    1. Display RenderBudget:
    - `Budget BebylonPerf`

    1. Freeze Game Thread
    - `Pause`

    1. Check Game Thread Perf
    - `stat Game`

    1. Pause Rendering
    - `show Rendering`
    ```

    It would need to be fixed as such:

    ```md{1,3}
    # Game Thread

    ## General

    1. Display RenderBudget:
      - `Budget BebylonPerf`

    2. Freeze Game Thread
      - `Pause`

    3. Check Game Thread Perf
      - `stat Game`

    4. Pause Rendering
      - `show Rendering`
    ```

- [ ] Code snippets need to be demarcated with with proper language tag (ie wrap the code snippet with ` ```cpp``` `)

- [ ] Fix markdown filenames
  - Remove special characters
# Grammar/full sentences

# Misc

- Fixing Links/link syntax