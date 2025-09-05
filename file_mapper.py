import os
import json

def build_file_map(root_dir):
    file_map = {}
    for dirpath, _, filenames in os.walk(root_dir):
        if not filenames:
            continue

        rel_path = os.path.relpath(dirpath, root_dir).replace("\\", "/")
        file_map[rel_path] = sorted(filenames)

    return file_map

if __name__ == "__main__":
    directory = input("Enter the root directory path: ").strip()

    if os.path.exists(directory):
        result = build_file_map(directory)

        with open("files_map.json", "w", encoding="utf-8") as f:
            f.write("{\n")
            for i, (key, files) in enumerate(result.items()):
                line = f'  "{key}": {json.dumps(files, ensure_ascii=False)}'
                if i < len(result) - 1:
                    line += ","
                f.write(line + "\n")
            f.write("}\n")

        print("File map saved in files_map.json")
    else:
        print("Invalid path!")
