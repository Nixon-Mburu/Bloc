def normalize_handle(handle):
    if not handle:
        return ""

    clean_handle = handle.strip().lower()
    return clean_handle if clean_handle.startswith("@") else f"@{clean_handle}"
