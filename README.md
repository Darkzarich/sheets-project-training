# sheets-project-training

[Show me what it looks like!](https://gifted-galileo-6ef79d.netlify.app/)

**Vanilla JavaScript** project, something similar to Google Sheets.
With this project I decided to try to stay away from any libraries, frameworks, any other utils (excluding build instruments such as Webpack) and make something using only **Vanilla JavaScript**.

On top of app functionality and features I made a simple framework and built this app applying some rules I defined for my framework 

Framework features include:

- Component approach
- Component HTML render
- Components-state allowing rerenders on changes
- `Emitter`class implementing Observer pattern to allow connection between Components
- `Redux`-like store and a way to react to changes from components, also has a middleware to save changes to `localStorage`
- `EngineDOM` class which simplifies many DOM operations, inspired a lot by `JQuery.js`, uses method chaining as well


App features include: 

- Sheets auto drawing
- Cell selection, group cell selection (with `Shift` key)
- Basic formula calculation
- Toolbar to change text styles inside Cells
- Rows and columns resizing 
- Saving any changes between refreshes
