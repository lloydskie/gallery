import os

def list_tree(path, file, folders_only=False, indent=""):
    try:
        items = os.listdir(path)
    except PermissionError:
        file.write(indent + "[Permission Denied]\n")
        return
    
    for i, item in enumerate(sorted(items)):
        full_path = os.path.join(path, item)
        if folders_only and not os.path.isdir(full_path):
            continue  # Skip files if only folders should be listed
        
        is_last = i == len(items) - 1
        branch = "└── " if is_last else "├── "
        file.write(indent + branch + item + "\n")
        
        if os.path.isdir(full_path):
            extension = "    " if is_last else "│   "
            list_tree(full_path, file, folders_only, indent + extension)

if __name__ == "__main__":
    directory = input("Enter the directory path: ").strip()
    mode = input("Do you want to list (a)ll items or only (f)olders? [a/f]: ").strip().lower()
    
    if os.path.exists(directory):
        folders_only = (mode == "f")
        with open("tree_output.txt", "w", encoding="utf-8") as f:
            f.write(directory + "\n")
            list_tree(directory, f, folders_only)
        print("Tree structure saved in tree_output.txt")
    else:
        print("Invalid path!")
