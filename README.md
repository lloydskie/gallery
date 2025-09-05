# Alumni Gallery

A simple web-based photo gallery for displaying alumni photos organized by batch or folder. The project uses HTML, CSS, and JavaScript to dynamically load and display images from a structured directory and a JSON file.

## Features
- Responsive grid layout for photo cards
- Batch/folder titles for easy navigation
- Hover effect for image cards
- Loads photo data from `photos.json`

## Project Structure
```
index.html           # Main gallery page
photos.json          # JSON file listing folders and photo filenames
assets/              # Contains images and supporting scripts
  tree_mapper.py     # (Optional) Script for mapping directory structure
  ...                # Subfolders with images
```

## How It Works
- The gallery loads photo data from `photos.json`.
- Images are displayed in a grid, grouped by folder/batch.
- Each image is loaded from the corresponding folder in `assets/`.

## Usage
1. Place your images in the appropriate folders under `assets/`.
2. Update `photos.json` to list all folders and their image files.
3. Open `index.html` in your browser to view the gallery.

## Customization
- Edit CSS in `index.html` for different styles.
- Update `photos.json` to change displayed images or folder names.

## Example `photos.json`
```json
{
  "DAY 1/5R CAP": ["PAT_7022 copy.jpg", "PAT_7055.jpg", ...],
  "DAY 1/5R CASUAL": ["..."],
  ...
}
```

## License
MIT
